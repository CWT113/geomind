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

2. **`gl.attachShader(program, shader)`**：将一个编译好的着色器附加到程序对象。

|  参数   |        作用         |
| :-----: | :-----------------: |
| program | WebProgram 程序对象 |
| shader  |   编译好的着色器    |

3. **`gl.linkProgram(program)`**：链接给定的 WebGLProgram，从而完成为程序的片元和顶点着色器准备 GPU 代码的过程，使其成为一个可用于渲染的着色器程序。

|  参数   |        作用         |
| :-----: | :-----------------: |
| program | WebProgram 程序对象 |

4. **`gl.useProgram(program)`**：将指定的程序对象设置为当前的渲染状态。

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



## 绘制图元

1. **`gl.drawArrays(mode, first, count)`**：是 WebGL API 中用于绘制图元（如点、线、面）的方法。它从当前绑定的缓冲区中提取顶点数据，根据指定的绘制模式进行渲染。

   - `mode`参数：

   |       类型        |        作用        |
   | :---------------: | :----------------: |
   |     gl.POINTS     |       绘制点       |
   |     gl.LINES      |  绘制不连接的线段  |
   |   gl.LINE_STRIP   |   绘制连接的线段   |
   |   gl.LINE_LOOP    |  绘制闭合的线段环  |
   |   gl.TRIANGLES    | 绘制不连接的三角形 |
   | gl.TRIANGLE_STRIP |  绘制连接的三角形  |
   |  gl.TRIANGLE_FAN  |   绘制三角形扇形   |

   - `first`参数：从缓冲区数组中的哪个位置开始读取顶点数据；
   - `count`参数：要绘制的顶点数量；



## 创建缓冲区对象

1. **`gl.createBuffer()`**：用于创建一个新的缓冲区对象。

   >缓冲区对象是用于存储顶点数据、颜色数据、纹理坐标等数据的内存区域，这些数据将被传递到 GPU 中以供渲染使用。

2. **`gl.bindBuffer(target, buffer)`**：绑定一个给定的 WebGL缓冲区对象到 指定的目标。

   - target参数：一个常量，指定要绑定的目标。

     |          类型           |                   作用                   |
     | :---------------------: | :--------------------------------------: |
     |     gl.ARRAY_BUFFER     | 表示顶点属性缓冲区，如顶点坐标、顶点颜色 |
     | gl.ELEMENT_ARRAY_BUFFER |   表示元素数组缓冲区，存储顶点索引数据   |

   - buffer参数：一个WebGLBuffer对象，表示要绑定的缓冲区。如果传入 null，则解除对当前目标的绑定。

3. **`gl.bufferData()`**：向缓冲区对象写入数据的方法。

   >它将数据复制到当前绑定的缓冲区中，并且可以指定使用这些数据的模式。

   ```js
   gl.bufferData(target, srcData, usage);
   gl.bufferData(target, size, usage);
   ```

   - target参数：指定绑定缓冲区的目标，常用有 `gl.ARRAY_BUFFER` 和 `gl.ELEMENT_ARRAY_BUFFER`；

   - srcData参数：一个`ArrayBuffer`、`ArrayBufferView`或`null`，包含要写入缓冲区的数据。如果传递 null，则会为缓冲区分配特定大小的内存，而不初始化；

   - usage参数：

     |      类型       |          作用          |
     | :-------------: | :--------------------: |
     | gl.STATIC_DRAW  | 数据不会或几乎不会改变 |
     | gl.DYNAMIC_DRAW |     数据会频繁改变     |
     | gl.STREAM_DRAW  | 数据每次绘制时都会改变 |

::: details 代码示例

```html
<script>
	const vertices = new Float32Array([
     0.5, 0.5, 
    -0.5, 0.5, 
    -0.5, -0.5, 
     0.5, -0.5
  ]);
  
  // 创建缓冲区并绑定缓冲区
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
</script>
```

:::



















