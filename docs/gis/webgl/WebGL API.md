# WebGL API

## 创建Canvas画布

```html
<canvas id="canvas" width="300" height="150"></canvas>
```

```html
<script>
	const canvas = document.getElementById("canvas")
	const gl = canvas.getContext("webgl")
</script>
```



## 创建着色器对象

1. **`gl.createShader(type)`** ：用于创建 顶点着色器/片元着色器，具体取决于 type 类型。

|        type        |      作用      |
| :----------------: | :------------: |
|  gl.VERTEX_SHADER  | 创建顶点着色器 |
| gl.FRAGMENT_SHADER | 创建片元着色器 |

2. **`gl.compileShader(shader)`**：用于编译着色器对象，使其成为二进制数据，然后被 `WebGLProgram` 对象所使用。

|  参数  |                  作用                  |
| :----: | :------------------------------------: |
| shader | 上一步创建的 WebGLShader（着色器对象） |

3. **`gl.shaderSource(shader, source)`**：用于设置着色器对象的字符串代码，相当于引入了着色器源码。

|  参数  |                       作用                       |
| :----: | :----------------------------------------------: |
| shader |      上一步创建的 WebGLShader（着色器对象）      |
| source | 包含GLSL程序代码的字符串（`<script>`中写的代码） |

::: details 代码示例

```html
<canvas id="canvas" width="300" height="150"></canvas>

<!-- 顶点着色器 -->
<script id="vertex-shader" type="x-shader/x-vertex">
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
</script>
<!-- 片段着色器 -->
<script id="fragment-shader" type="x-shader/x-fragment">
	void main() {
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}
</script>

<script>
  const canvas = document.getElementById("canvas")
  const gl = canvas.getContext("webgl")

  // 创建顶点着色器和片元着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

  // 获取顶点着色器和片元着色器的程序源码
  const vertexShaderSource = document.getElementById("vertex-shader").innerText
  const fregmentShaderSource = document.getElementById("fragment-shader").innerText

  // 编译着色器使其成为二进制数据
  gl.compileShader(vertexShader)
  gl.compileShader(fragmentShader)

  // 设置顶点着色器和片元着色器的程序源码
  gl.shaderSource(vertexShader, vertexShaderSource)
  gl.shaderSource(fragmentShader, fregmentShaderSource)
</script>
```

:::



## 创建WebProgram对象

1. **`gl.createProgram()`**：用于创建一个 WebProgram 程序对象，这个对象表示一个 WebGL 着色器对象，它包含了一个顶点着色器和一个片元着色器，可以被 WebGL 渲染管线使用。

   >WebGLProgram 的作用是将顶点着色器和片元着色器组合在一起，以便 WebGL 渲染管线能够使用这两个着色器来处理顶点和片元的操作。通过创建和链接一个 WebGLPtogram，可以确保顶点着色器和片元着色器能够正确的协同工作，从而完成图形的渲染。

2. `gl.attachShader(program, shader)`：将一个编译好的着色器附加到程序对象。

|  参数   |        作用         |
| :-----: | :-----------------: |
| program | WebProgram 程序对象 |
| shader  |   编译好的着色器    |

3. `gl.linkProgram(program)`：链接给定的 WebGLProgram，从而完成为程序的片元和顶点着色器准备 GPU 代码的过程，使其成为一个可用于渲染的着色器程序。

|  参数   |        作用         |
| :-----: | :-----------------: |
| program | WebProgram 程序对象 |

4. `gl.useProgram(program)`：将指定的程序对象设置为当前的渲染状态。

|  参数   |        作用         |
| :-----: | :-----------------: |
| program | WebProgram 程序对象 |

::: details 代码示例

```html
<script>
  // 创建 WebProgram 对象
  const program = gl.createProgram()
  // 添加顶点着色器
  gl.attachShader(program, vertexShader)
  // 添加片元着色器
  gl.attachShader(program, fragmentShader)
  // 链接 WebProgram 对象
  gl.linkProgram(program)
  // 开始使用 WebProgram 对象
  gl.useProgram(program)

  // 获取在 WebGL 程序中定义的 aVertexPosition 变量的索引
  const vertexPositionAttributes = gl.getAttribLocation(
    program,
    "aVertexPosition"
  ) // 0
</script>
```

:::

































