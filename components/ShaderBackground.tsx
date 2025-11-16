'use client'

import { useRef, useEffect } from 'react'

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const rendererRef = useRef<WebGLRenderer | null>(null)

  // WebGL Renderer class
  class WebGLRenderer {
    private canvas: HTMLCanvasElement
    private gl: WebGL2RenderingContext
    private program: WebGLProgram | null = null
    private vs: WebGLShader | null = null
    private fs: WebGLShader | null = null
    private buffer: WebGLBuffer | null = null
    private scale: number
    private shaderSource: string

    private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1]

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas
      this.scale = scale
      this.gl = canvas.getContext('webgl2')!
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale)
      this.shaderSource = cloudsOnlyShaderSource
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl
      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader)
        console.error('Shader compilation error:', error)
      }
    }

    reset() {
      const gl = this.gl
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs)
          gl.deleteShader(this.vs)
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs)
          gl.deleteShader(this.fs)
        }
        gl.deleteProgram(this.program)
      }
    }

    setup() {
      const gl = this.gl
      this.vs = gl.createShader(gl.VERTEX_SHADER)!
      this.fs = gl.createShader(gl.FRAGMENT_SHADER)!
      this.compile(this.vs, this.vertexSrc)
      this.compile(this.fs, this.shaderSource)
      this.program = gl.createProgram()!
      gl.attachShader(this.program, this.vs)
      gl.attachShader(this.program, this.fs)
      gl.linkProgram(this.program)

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program))
      }
    }

    updateScale(scale: number) {
      this.scale = scale
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale)
    }

    init() {
      const gl = this.gl
      const program = this.program!
      
      this.buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW)

      const position = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      ;(program as any).resolution = gl.getUniformLocation(program, 'resolution')
      ;(program as any).time = gl.getUniformLocation(program, 'time')
    }

    render(now = 0) {
      const gl = this.gl
      const program = this.program
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return

      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
      
      gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height)
      // Langsamere Bewegung für sanften Übergang, aber synchron mit Hero-Start
      gl.uniform1f((program as any).time, now * 1e-3 * 0.3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
  }

  const resize = () => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
    
    // Nutze die volle Viewport-Breite und Höhe
    const fullHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight)
    canvas.width = window.innerWidth * dpr
    canvas.height = fullHeight * dpr
    
    // Stelle sicher, dass das Canvas die volle Höhe einnimmt
    canvas.style.width = '100vw'
    canvas.style.height = `${fullHeight}px`
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr)
    }
  }

  const loop = (now: number) => {
    if (!rendererRef.current) return
    
    rendererRef.current.render(now)
    animationFrameRef.current = requestAnimationFrame(loop)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio)
    
    rendererRef.current = new WebGLRenderer(canvas, dpr)
    
    rendererRef.current.setup()
    rendererRef.current.init()
    
    resize()
    
    loop(0)
    
    const handleResize = () => resize()
    const handleScroll = () => resize()
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.reset()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full object-contain touch-none pointer-events-none"
      style={{ 
        background: 'black',
        width: '100vw',
        height: '100%',
        minHeight: '100vh',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1
      }}
    />
  )
}

// Shader nur mit Wolken (ohne Strahlen)
const cloudsOnlyShaderSource = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
* Modified: Only clouds, no particles/rays
*/
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
	float d=1., t=.0;
	for (float i=.0; i<3.; i++) {
		float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
		t=mix(t,d,a);
		d=a;
		p*=2./(i+1.);
	}
	return t;
}
void main(void) {
	vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
	vec3 col=vec3(0);
	float bg=clouds(vec2(st.x+T*.5,-st.y));
	// Nur die Wolken, keine Partikel/Strahlen
	col=vec3(bg*.0,bg*.3,bg*.35);
	O=vec4(col,1);
}`

export default ShaderBackground

