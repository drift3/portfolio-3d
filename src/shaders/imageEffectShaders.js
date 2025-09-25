// GLSL Shader collection for image effects

export const vertexShader = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0, 1);
    v_texCoord = a_texCoord;
  }
`;

export const refractionFragmentShader = `
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
    
    // Create multiple ripple layers for more complex refraction
    float ripple1 = sin(distance * 25.0 - u_time * 4.0) * 0.015;
    float ripple2 = sin(distance * 15.0 - u_time * 2.5) * 0.01;
    float ripple3 = sin(distance * 35.0 - u_time * 6.0) * 0.008;
    
    // Combine ripples
    float totalRipple = ripple1 + ripple2 + ripple3;
    
    // Create glass-like lens distortion
    float lensDistortion = 1.0 + distance * distance * 0.2;
    vec2 distortedUV = center + offset * lensDistortion;
    
    // Add animated refraction waves
    distortedUV += vec2(
      sin(uv.y * 12.0 + u_time * 3.0) * 0.012,
      cos(uv.x * 12.0 + u_time * 2.5) * 0.012
    );
    
    // Apply ripple displacement
    distortedUV += normalize(offset) * totalRipple;
    
    // Sample the texture with slight offset for each color channel (chromatic aberration)
    vec4 color;
    color.r = texture2D(u_texture, distortedUV + vec2(0.003, 0.0)).r;
    color.g = texture2D(u_texture, distortedUV).g;
    color.b = texture2D(u_texture, distortedUV - vec2(0.003, 0.0)).b;
    color.a = texture2D(u_texture, distortedUV).a;
    
    // Add subtle water caustics effect
    float caustics = sin(uv.x * 20.0 + u_time * 1.5) * cos(uv.y * 20.0 + u_time * 1.8) * 0.05 + 1.0;
    color.rgb *= caustics;
    
    gl_FragColor = color;
  }
`;

export const smokeFragmentShader = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  
  // Enhanced noise functions for more realistic smoke
  float hash(vec2 p) {
    p = 50.0 * fract(p * 0.3183099 + vec2(0.71, 0.113));
    return -1.0 + 2.0 * fract(p.x * p.y * (p.x + p.y));
  }
  
  float noise(in vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0, 0.0)), 
                   hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), 
                   hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  
  float fbm(vec2 p) {
    float f = 0.0;
    f += 0.500 * noise(p); p *= 2.02;
    f += 0.250 * noise(p); p *= 2.03;
    f += 0.125 * noise(p); p *= 2.01;
    f += 0.0625 * noise(p);
    return f / 0.9375;
  }
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Create turbulent smoke motion
    vec2 smokeFlow = vec2(
      fbm(uv * 2.0 + vec2(0.0, u_time * 0.8)),
      fbm(uv * 3.0 + vec2(u_time * 0.6, 0.0))
    ) * 0.1;
    
    // Add vertical flame distortion
    float flameHeight = (1.0 - uv.y) * 2.0;
    vec2 flameDistortion = vec2(
      sin(uv.y * 8.0 + u_time * 4.0) * 0.02 * flameHeight,
      fbm(uv * 4.0 + u_time * 1.0) * 0.03 * flameHeight
    );
    
    // Combine distortions
    vec2 distortedUV = uv + smokeFlow + flameDistortion;
    
    // Create dissolve mask with multiple layers
    float dissolve1 = fbm(uv * 3.0 + u_time * 0.5);
    float dissolve2 = fbm(uv * 5.0 - u_time * 0.3);
    float heightMask = pow(1.0 - uv.y, 1.5);
    
    float dissolveMask = smoothstep(0.2, 0.8, (dissolve1 + dissolve2) * 0.5 + heightMask * 0.7);
    
    // Sample original texture
    vec4 originalColor = texture2D(u_texture, distortedUV);
    
    // Create flame colors with temperature gradient
    vec3 flameCore = vec3(1.0, 0.8, 0.2);    // Hot core
    vec3 flameMid = vec3(1.0, 0.4, 0.0);     // Mid flame
    vec3 flameEdge = vec3(0.6, 0.1, 0.0);    // Cooler edges
    vec3 smokeColor = vec3(0.3, 0.3, 0.35);  // Smoke
    
    // Mix flame colors based on dissolution
    vec3 fireColor = mix(flameCore, flameMid, smoothstep(0.3, 0.6, 1.0 - dissolveMask));
    fireColor = mix(fireColor, flameEdge, smoothstep(0.6, 0.8, 1.0 - dissolveMask));
    fireColor = mix(fireColor, smokeColor, smoothstep(0.8, 0.95, 1.0 - dissolveMask));
    
    // Apply effects
    vec3 finalColor = mix(fireColor, originalColor.rgb, dissolveMask);
    float alpha = originalColor.a * (dissolveMask * 0.9 + 0.1);
    
    // Add flickering embers
    float ember = noise(uv * 20.0 + u_time * 3.0);
    if (ember > 0.85 && dissolveMask < 0.5) {
      finalColor += vec3(1.0, 0.6, 0.0) * 0.5;
    }
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const pixelationFragmentShader = `
  precision mediump float;
  uniform sampler2D u_texture;
  uniform float u_time;
  uniform vec2 u_resolution;
  varying vec2 v_texCoord;
  
  // Digital noise for glitch effects
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  void main() {
    vec2 uv = v_texCoord;
    
    // Create oscillating pixelation with multiple frequencies
    float pixelPhase = u_time * 0.8;
    float pixelIntensity = abs(sin(pixelPhase)) * 0.7 + 0.3;
    
    // Base pixelation that varies from 2x2 to 32x32
    float basePixelSize = mix(2.0, 32.0, pixelIntensity);
    
    // Add secondary pixelation wave for more complex patterns
    float secondaryWave = sin(u_time * 2.0 + uv.x * 10.0) * 0.5 + 0.5;
    float pixelSize = basePixelSize * (1.0 + secondaryWave * 0.5);
    
    // Apply pixelation
    vec2 pixelGrid = floor(uv * pixelSize) / pixelSize;
    vec2 pixelCenter = pixelGrid + vec2(0.5) / pixelSize;
    
    vec4 pixelatedColor = texture2D(u_texture, pixelCenter);
    
    // Create digital glitch lines
    float glitchLine = step(0.98, sin(uv.y * 800.0 + u_time * 20.0));
    float glitchShift = random(floor(uv.y * 100.0 + u_time * 5.0)) * 0.05;
    
    if (glitchLine > 0.0) {
      pixelatedColor = texture2D(u_texture, pixelCenter + vec2(glitchShift, 0.0));
    }
    
    // Add RGB channel separation for digital artifact effect
    float separationAmount = pixelIntensity * 0.01;
    vec4 separatedColor;
    separatedColor.r = texture2D(u_texture, pixelCenter + vec2(separationAmount, 0.0)).r;
    separatedColor.g = pixelatedColor.g;
    separatedColor.b = texture2D(u_texture, pixelCenter - vec2(separationAmount, 0.0)).b;
    separatedColor.a = pixelatedColor.a;
    
    // Mix based on pixelation intensity
    vec4 finalColor = mix(separatedColor, pixelatedColor, 0.7);
    
    // Add digital noise overlay
    float noise = random(uv + u_time * 0.1) * 0.05;
    finalColor.rgb += vec3(noise);
    
    // Create scanline effect
    float scanline = sin(uv.y * u_resolution.y * 2.0) * 0.02;
    finalColor.rgb += vec3(scanline);
    
    // Add color quantization for more digital look
    finalColor.rgb = floor(finalColor.rgb * 16.0) / 16.0;
    
    gl_FragColor = finalColor;
  }
`;

export const getShaderByEffect = (effect) => {
  switch (effect) {
    case 'smoke':
      return smokeFragmentShader;
    case 'pixelate':
      return pixelationFragmentShader;
    case 'refraction':
    default:
      return refractionFragmentShader;
  }
};