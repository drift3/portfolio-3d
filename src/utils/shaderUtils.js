// WebGL utility functions for shader management

export const createShader = (gl, type, source) => {
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

export const createProgram = (gl, vertexShader, fragmentShader) => {
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

export const loadTexture = (gl, src, callback) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Fill with placeholder pixel
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    
    // Handle non-power-of-2 textures
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }
    
    if (callback) callback();
  };
  
  image.onerror = () => {
    console.error('Failed to load texture:', src);
  };
  
  image.src = src;
  return texture;
};

const isPowerOf2 = (value) => {
  return (value & (value - 1)) === 0;
};

export const setupGeometry = (gl, program) => {
  // Create a rectangle that covers the entire canvas
  const positions = new Float32Array([
    // Position   // TexCoord
    -1, -1,       0, 0,
     1, -1,       1, 0,
    -1,  1,       0, 1,
    -1,  1,       0, 1,
     1, -1,       1, 0,
     1,  1,       1, 1,
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

  return buffer;
};

export const getWebGLContext = (canvas) => {
  const gl = canvas.getContext('webgl2') || 
             canvas.getContext('webgl') || 
             canvas.getContext('experimental-webgl');
             
  if (!gl) {
    console.error('WebGL not supported');
    return null;
  }

  return gl;
};

export const resizeCanvas = (canvas, displayWidth, displayHeight) => {
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  
  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  
  return needResize;
};