import React, { useRef, useEffect, useState } from 'react';

// Vertex shader (same for all effects)
const vertexShader = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_texCoord = a_texCoord;
  }
`;

// Refraction fragment shader
const refractionFragmentShader = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  
  void main() {
    vec2 uv = v_texCoord;
    vec2 center = vec2(0.5, 0.5);
    vec2 offset = uv - center;
    float distance = length(offset);
    
    // Create ripple effect
    float ripple = sin(distance * 20.0 - u_time * 3.0) * 0.02;
    
    // Create lens distortion
    float lensDistortion = 1.0 + distance * 0.3;
    vec2 distortedUV = center + offset * lensDistortion;
    
    // Add refraction offset
    distortedUV += vec2(
      sin(uv.y * 10.0 + u_time * 2.0) * 0.01,
      cos(uv.x * 10.0 + u_time * 2.0) * 0.01
    );
    
    // Add ripple
    distortedUV += offset * ripple;
    
    // Sample the texture
    vec4 color = texture2D(u_texture, distortedUV);
    
    // Add chromatic aberration
    color.r = texture2D(u_texture, distortedUV + vec2(0.002, 0.0)).r;
    color.b = texture2D(u_texture, distortedUV - vec2(0.002, 0.0)).b;
    
    gl_FragColor = color;
  }
`;

// Smoke/Fire fragment shader
const smokeFragmentShader = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  
  // Noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Create flame-like distortion
    float distortion = noise(uv * 3.0 + vec2(0.0, u_time * 2.0)) * 0.1;
    float verticalDisplacement = noise(uv * 5.0 + vec2(u_time * 1.5, 0.0)) * 0.05;
    
    // Apply distortion
    vec2 distortedUV = uv + vec2(distortion, verticalDisplacement);
    
    // Create dissolve effect based on noise
    float dissolve = noise(uv * 4.0 + u_time * 0.5);
    float dissolveMask = smoothstep(0.3, 0.7, dissolve + (1.0 - uv.y) * 0.5);
    
    // Sample texture
    vec4 color = texture2D(u_texture, distortedUV);
    
    // Apply flame colors to dissolved areas
    vec3 flameColor = vec3(1.0, 0.3, 0.0) * (1.0 - dissolveMask);
    vec3 smokeColor = vec3(0.2, 0.2, 0.2) * (1.0 - dissolveMask * 0.5);
    
    // Mix original color with flame/smoke
    color.rgb = mix(color.rgb, flameColor + smokeColor, 1.0 - dissolveMask);
    color.a *= dissolveMask;
    
    gl_FragColor = color;
  }
`;

// Pixelation fragment shader
const pixelationFragmentShader = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Calculate pixelation level (oscillates between high pixelation and normal)
    float pixelLevel = abs(sin(u_time * 0.5)) * 50.0 + 5.0;
    
    // Apply pixelation
    vec2 pixelSize = vec2(pixelLevel) / u_resolution;
    vec2 pixelatedUV = floor(uv / pixelSize) * pixelSize + pixelSize * 0.5;
    
    vec4 color = texture2D(u_texture, pixelatedUV);
    
    // Add digital glitch effect
    float glitch = step(0.98, sin(uv.y * 500.0 + u_time * 10.0));
    color.rgb += vec3(glitch * 0.2, 0.0, glitch * 0.1);
    
    gl_FragColor = color;
  }
`;

const WebGLImageEffect = ({ 
  src, 
  width = 64, 
  height = 64, 
  effect = 'refraction',
  className = ''
}) => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const textureRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const [imageLoaded, setImageLoaded] = useState(false);

  // Initialize WebGL
  const initWebGL = () => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.error('WebGL not supported');
      return false;
    }

    glRef.current = gl;
    return true;
  };

  // Create shader
  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  // Create program
  const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  };

  // Setup WebGL program
  const setupProgram = () => {
    const gl = glRef.current;
    if (!gl) return;

    // Get fragment shader based on effect
    let fragmentShaderSource;
    switch (effect) {
      case 'smoke':
        fragmentShaderSource = smokeFragmentShader;
        break;
      case 'pixelate':
        fragmentShaderSource = pixelationFragmentShader;
        break;
      default:
        fragmentShaderSource = refractionFragmentShader;
    }

    // Create shaders
    const vShader = createShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vShader || !fShader) return;

    // Create program
    const program = createProgram(gl, vShader, fShader);
    if (!program) return;

    programRef.current = program;
    gl.useProgram(program);

    // Setup geometry
    const positions = new Float32Array([
      -1, -1,  0, 0,
       1, -1,  1, 0,
      -1,  1,  0, 1,
      -1,  1,  0, 1,
       1, -1,  1, 0,
       1,  1,  1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Setup attributes
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);

    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 16, 8);

    // Setup uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const textureLocation = gl.getUniformLocation(program, 'u_texture');

    gl.uniform2f(resolutionLocation, width, height);
    gl.uniform1i(textureLocation, 0);

    return { timeLocation };
  };

  // Load texture
  const loadTexture = () => {
    const gl = glRef.current;
    if (!gl) return;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Fill with placeholder pixel
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      
      // Setup texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      
      setImageLoaded(true);
    };
    image.src = src;

    textureRef.current = texture;
  };

  // Render loop
  const render = () => {
    const gl = glRef.current;
    const program = programRef.current;
    
    if (!gl || !program || !imageLoaded) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    // Clear canvas
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Update time uniform
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const time = (Date.now() - startTimeRef.current) / 1000;
    gl.uniform1f(timeLocation, time);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    animationRef.current = requestAnimationFrame(render);
  };

  // Initialize everything
  useEffect(() => {
    if (!initWebGL()) return;
    
    const uniforms = setupProgram();
    if (uniforms) {
      loadTexture();
      startTimeRef.current = Date.now();
      render();
    }

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      const gl = glRef.current;
      if (gl && textureRef.current) {
        gl.deleteTexture(textureRef.current);
      }
      if (gl && programRef.current) {
        gl.deleteProgram(programRef.current);
      }
    };
  }, [src, effect]); // Re-initialize when effect changes

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="rounded-full"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          filter: 'drop-shadow(0 0 10px rgba(20, 184, 166, 0.5))'
        }}
      />
    </div>
  );
};

export default WebGLImageEffect;