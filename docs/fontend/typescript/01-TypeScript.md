# TypeScript

`TypeScript`（简称：TS）是 `JavaScript` 的一个超集。

## TS 中的常用类型

### 常用基础类型概述

TS 中的常用基础类型细分为两类：

1. JS 已有类型：

   - 原始类型：`number` / `string` / `boolean` / `null` / `underfined` / `symbol`

   - 对象类型：数组、对象、函数等

1. TS 新增类型：

   - 联合类型、自定义类型（类型别名）、接口、元祖、字面量类型、枚举、`void`、`any`等

### 1. 类型注解

- 作用：为变量添加类型约束，即约定了什么类型，就只能给变量赋值该类型的值，否则报错。

  ```TypeScript
  // :number 就是类型注解
  let age: number = 20
  age = 30  		 // 允许此操作
  age = '小明' 		// 直接报错

### 2. 原始类型

```typescript
let age: number = 20
let str: string = '小明'
let isTrue: boolean = false
let a: null = null
let b: undefined = undefined
let s: symbol = Symbol()
```

### 3. 数组类型

```TypeScript
// 两种书写方式
let arr1: number[] = [1, 3, 5]

let arr2: Array<string> = ['a', 'b', 'c']

// 联合类型
let arr3: (number | string)[] = [1, 3, 5, 'a', 'b']
```

### 4. 类型别名

- 类型别名（自定义类型）：为任意类型起别名。

- 关键字：`type`

- 使用场景：当同一类型（复杂）被多次使用时，可以通过类型别名，简化该类型的使用。

  ```TypeScript
  // 类型别名
  type CustomArray = (number | string)[]
  
  let arr: CustomArray = [1, 3, 5, 'a', 'b']
  
  let arr1: CustomArray = [2, 4, 6, 'aa', 'bb']
  ```

### 5. 函数类型

- 函数类型，实际上指的是：为函数的参数和返回值设置类型。

- 为函数指定类型的两种方式：

  - 单独指定参数、返回值的类型；

  - 同时指定参数、返回值的类型；

1. 单独指定参数、返回值的类型：

   ```TypeScript
   // 普通函数 声明方式
   function add(num1: number, num2: number): number {
     return num1 + num2
   }

   // 函数表达式 声明方式
   const add = (num1: number, num2: number): number => {
     return num1 + num2
   }
   ```

1. 同时指定参数、返回值的类型：

   ```TypeScript
   // 注意：此方式只适用于 函数表达式
   const add: (num1: number, num2: number) => number = (num1, num2) => {
     return num1 + num2
   }
   ```

1. 函数没有返回值（`void`）：

   ```TypeScript
   // 函数没有返回值，可声明为 void
   function add(name: string): void {
     console.log('hello' + name)
   }
   ```

1. 函数可选参数与必选参数（`?`）：

   ```TypeScript
   // 在 类型注解 中添加 ? 号，表示此参数为可选参数
   function mySlice(start?: number, end?: number) {
     console.log('起始索引:', start, '结束索引：', end)
   }
   ```

### 6. 对象类型

- 直接使用`{}`来描述对象结构。

  - 属性：`属性名：类型`

  - 方法：`方法名：返回值类型`

```TypeScript
// 方式一
let person: { name: string; age: number; sayHi(): void } = {
  name: '小明',
  age: 20,
  sayHi() {}
}

// 方式二
let person: {
  name: string
  age: number
  // sayHi(): void
  sayHi: () => void  // 方法也可以使用箭头函数
} = {
  name: '小明',
  age: 20,
  sayHi() {}
}
```

### 7. 接口

- 当一个对象类型被多次使用时，一般会使用接口（interface）来描述对象的类型。

- 关键字：`interface`

  ```TypeScript
  // 定义接口
  interface IPerson {
    name: string
    age: number
    sayHi(): void
  }
  
  // 使用接口
  let person: IPerson = {
    name: '小明',
    age: 20,
    sayHi() {}
  }
  ```

**类型别名（type）和接口（interface）的对比：**

- 相同点：都可以为对象指定类型；

- 不同点：

  - 接口：只能为对象指定类型；

  - 类型别名：不仅可以为对象指定类型，实际上可以为任意类型指定别名。

### 8. 接口继承

- 如果两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用。

- 关键字：`extends`

  ```TypeScript
  // 常规写法，复用性不高
  interface Point2D { x: number, y: number }
  interface Point3D { x: number, y: number, z: number }
  ```

  ```TypeScript
  // 使用接口继承
  interface Point2D { x: number, y: number }
  // Point3D 继承了 Point2D 的属性，并添加了自己的新属性 z
  interface Point3D extends Point2D { z: number }
  
  let point:Point3D = {
    x: 1,
    y: 1,
    z: 1
  }
  ```

### 9. 元组

- 元组类型可以确切的标记出有多少个元素，以及每个元素的类型。

- 使用场景：如我们想要某点的坐标，确切知道有两个点，都为 number 类型。

  ```TypeScript
  let position: [number, number] = [114, 30]
  ```

### 10. 类型推论

- TS 中存在类型推论机制，可以辅助我们确定类型。

- 发生类型推论的 2 种场景：

  - 声明变量并初始化时；

  - 函数返回值确定时；

```TypeScript
// 初始化变量，并声明值时，可以省略类型注解
// let age: number = 20
let age = 20

// 当函数的返回值由参数可以直接推论时，可以省略类型注解
// function add(num1: number, num2: number): number {
//   return num1 + num2  // 数字+数字肯定等于数字类型
// }
function add(num1: number, num2: number) {
  return num1 + num2
}
```

### 11. 字面量类型

- 使用模式：字面量类型配合联合类型一起使用。

- 使用场景：用来表示一组明确的可选值列表。

- 比如，在贪吃蛇游戏中，游戏方向的可选值只能是上、下、左、右中的任意一个。

  ```TypeScript
  function changeDirect(direct: 'up' | 'down' | 'left' | 'right') {
    console.log(direct)
  }
  
  // 传递的参数，只能是定义的 4 个字面量类型
  changeDirect('left')
  ```

### 12. 枚举

- 关键字：`enum`

- 枚举的功能类似于 字面量类型 + 联合类型 组合的功能，也可以表示一组明确的可选值。

- 枚举：定义一组命名常量。他描述一个值，该值可以是这些命名常量中的一个。

  ```TypeScript
  // 定义枚举
  enum Direction { Up, Down, Left, Right }

  function changeDirection(direction: Direction) {}

  // 使用枚举（ . 的方式）
  changeDirection(Direction.Left)
  ```

- 注意：

  - 枚举的使用方式：使用 `枚举名称.枚举属性`的方式。

#### 12.1 数字枚举

- 注意：枚举成员是有值的，默认为：从 0 开始自增的数值。

- 我们把枚举成员的值为数字的枚举，称为：数字枚举。

  ```TypeScript
  // 为某一个枚举成员设置初始值
  enum Direction {
    Up = 10,
    Down, // Down: 11;
    Left, // Left: 12;
    Right // Right: 13
  }
  
  // 为每一个枚举成员都设置初始值
  enum Direction {
    Up = 2,
    Down = 4,
    Left = 6,
    Right = 8
  }
  ```

#### 12.2 字符串枚举

- 注意：字符串枚举只要为一个设置了初始值，其余的所有都必须设置初始值。

  ```TypeScript
  // 字符串枚举
  enum Direction {
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right'
  }
  ```

### 13. `any`类型

- 原则：不推荐使用`any`类型。

- 隐式具有`any`类型的情况：

  - 声明变量不提供类型也不提供初始值

  - 函数参数不加类型

```TypeScript
// 声明变量不提供类型也不提供初始值
let a

// 函数参数不加类型
function add(num1, num2) {}
```



## TS 中的高级类型

### 1. `class`类

- `class`的基本使用，如下：

  ```TypeScript
  class Person {}

  const p = new Person()
  ```

- 解释：

  - 根据 TS 中的类型推论，可以知道 Person 类的实例对象 P 的类型是 Person。

  - TS 中的 class，不仅提供了 class 的语法功能，也作为一种类型存在。

- 实例属性初始化：

  ```TypeScript
  class Person {
    age: number
    gender = '男'				// 简化写法
    // gender: string = '男'   // 完整写法
  }
  ```

#### 1.1 class 类的构造函数

- 注意：构造函数不需要返回值！

  ```TypeScript
  class Person {
    age: number
    gender: string
  
    constructor(age: number, gender: string) {
      this.age = age
      this.gender = gender
    }
  }
  
  const p = new Person(20, '男')
  ```

#### 1.2 class 类的实例方法

```TypeScript
class Point {
  x = 1
  y = 2

  // x,y同时放大10倍
  scale(n: number) {
    this.x *= n
    this.y *= n
  }
}

const p = new Point()

p.scale(10)
```

#### 1.3 class 类的继承

- 类的继承有两种方式：

  1. `extends`（继承父类）

  2. `implements`（实现接口）

`entends`:

```TypeScript
class Animal {
  move() {
    console.log('走两步')
  }
}

class Dog extends Animal {
  name = '二哈'
  bark() {
    console.log('旺旺！')
  }
}

const d = new Dog()
```

`implements`：

```TypeScript
itnterface Singable {
  name: string
  sing(): void
}

// Son 类实现接口 Father 意味着，Person类中必须提供 Singable 接口中指定的所有方法和属性。
class Person implements Singable {
  name: '小明'

  sing() {
    console.log('爱是不是不开口才珍贵~')
  }
}
```

#### 1.4 class 类成员可见性

- 类成员可见性：可以使用 TS 来控制 class 的方法或属性对于 class 外的代码是否可见。

- 可见性修饰符有 3 种：

  - `public`：共有的

  - `protected`：受保护的

  - `private`：私有的

`public`：

```TypeScript
// public是默认可见性，一般情况下可以省略不写
class Animal {
  public move() {
    console.log('走两步')
  }
}
```

`protected`：

```TypeScript
class Animal {
  // move 方法是受保护的
  protected move() {
    console.log('走一走')
  }
  run() {
    this.move() // 父类的其他方法中，可以调用
    console.log('跑一跑')
  }
}

const a = new Animal()
a.move() // ❌父类实例方法不能调用！

class Dog extends Animal {
  eat() {
    this.move() // 子类的其他方法中，可以调用
    console.log('吃饭')
  }
}

const d = new Dog()
d.move() // ❌子类实例方法不能调用！
```

`pritive`：

```TypeScript
class Animal {
  // __run__方法是私有的
  private __run__() {
    console.log('哈喽啊')
  }
  protected move() {
    this.__run__() // 父类受保护的方法中可以调用
    console.log('走一走')
  }
  run() {
    this.__run__() // 父类普通方法中可以调用
    console.log('跑一跑')
  }
}

const a = new Animal()
a.__run__() // ❌父类的实例方法不能调用

class Dog extends Animal {
  eat() {
    a.__run__() // ❌子类的普通方法中不能调用
    console.log('吃饭')
  }
}

const d = new Dog()
d.__run__() // ❌子类的实例方法不能调用
```

### 2. 交叉类型

- 交叉类型：功能类似于接口继承（extends），用于组合多个类型为一个类型（常用于对象类型）。

- 关键字：`&`

  ```TypeScript
  interface Person {
    name: string
  }
  
  interface Concat {
    phone: string
  }
  
  // 交叉类型
  type PersonDetail = Person & Concat
  
  let obj: PersonDetail = {
    name: '小明',
    phone: '123456'
  }
  ```

#### 2.1 交叉类型和继承对比

- 相同点：都可以实现对象类型的组合；

- 不同点：两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同。

  ```TypeScript
  // 继承
  interface A {
    fn: (value: string) => {}
  }
  
  interface B extends A { // 注意：此时的 B 会报错（不能将string类型分配给number）
    fn: (value: number) => {}
  }
  ```

  ```TypeScript
  // 交叉类型
  interface A {
    fn: (value: string) => {}
  }
  
  interface B {
    fn: (value: number) => {}
  }
  
  type C = A & B
  
  // 可以简单理解为: value 既可以是 string 类型，也可以是 number 类型
  let obj: C = {
    fn(value: string | number) {
      return ''
    }
  }
  ```

### 3. 泛型

- 当想传递任意类型，还要类型检查，就可以使用泛型。

- 关键字：`<>`

  ```TypeScript
  // 定义泛型函数
  function id<Type>(value: Type): Type {
    return value
  }
  
  // 调用泛型函数
  // 1 以 number 类型调用泛型
  const num = id<number>(10)
  
  // 2 以 string 类型调用泛型
  const str = id<string>('aa')
  ```

#### 3.1 泛型约束

- 默认情况下，泛型函数的类型变量 Type 可以代表多个类型，这就导致无法访问任何属性。

  ```TypeScript
  function id<Type>(value: Type): Type {
    // ❌注意：此时的 length 就会报错！因为不确定 Type 到底是什么类型，如 number 没有length 属性
    value.length
    return value
  }
  ```

- 解决方案：

  - 指定更加具体的类型

  - 添加约束

1. **指定更加具体的类型**：

   ```TypeScript
   // 指定为 Type 类型的数组，因为数组有长度
   function id<Type>(value: Type[]): Type[] {
     value.length
     return value
   }
   ```

1. **添加约束：**

   ```TypeScript
   interface ILength { length: number }
   
   // extends: 不是继承的意思，而是满足！
   // 代表含义：Type 类型必须满足 ILength 指定的要求。
   function id<Type extends ILength>(value: Type): Type {
     value.length
     return value
   }
   ```

#### 3.2 泛型的多个类型变量

- 泛型的类型变量可以有多个，并且类型变量之间还可以约束（比如，第二个类型变量受第一个类型变量约束）

- `keyof`关键字接受一个对象类型，生成其键名称的联合类型。

  ```TypeScript
  // keyof Type 实际上获取的是 person 对象所有键的联合类型，也就是 'name' | 'age'
  function getProp<Type, key extends keyof Type>(obj: Type, key: key) {
    return obj[key]
  }
  
  // 类型变量 key 受 Type 约束，即 key 只能是 Type 所有键中的任意一个，或者只能访问对象中存在的属性
  getProp({ name: '小明', age: 18 }, 'name')
  getProp({ name: '小明', age: 18 }, 'age')
  ```

### 4. 泛型接口

- 在接口名称的后面添加 <类型变量>，这个接口就变成了泛型接口。

  ```TypeScript
  interface IdFunc<Type> {
    id: (value: Type) => Type
    ids: () => Type[]
  }
  
  let obj: IdFunc<number> = {
    id: (value) => value, // id方法的参数和返回值都是 number 类型
    ids: () => [1, 2, 3] // ids 方法无参数，返回值是 数值型的数组
  }
  ```

### 5. 泛型类

- 泛型类：class 也可以配合泛型来使用。

  ```TypeScript
  class GenericNumber<NumType> {
    defaultValue: NumType
    add: (x: NumType, y: NumType) => NumType
  }
  
  // 实例化的时候，明确指定实例的 类型
  const myNum = new GenericNumber<number>()
  myNum.defaultValue = 10
  ```

### 6. 泛型工具类型

- 泛型工具类型：TS 中内置了一些常用的工具类型，来简化 TS 中的一些操作。

#### 6.1 `Partial<Type>`

- `Partial<Type>`用来构造一个类型，将 Type 的所有属性设置为 可选。

  ```TypeScript
  interface Props {
    id: number
    hobby: string[]
  }
  
  type partialProps = Partial<Props>
  
  // 把 Props 接口中定义的属性变为可选
  let p: partialProps = {}
  
  let p1: partialProps = {
    id: 1,
    hobby: ['吃饭', '睡觉']
  }
  ```

#### 6.2 `Readonly<Type>`

- `Readonly<Type>`用来构造一个类型，将 Type 的所有属性都设置为 readondy（只读）。

  ```typescript
  interface Props {
    id: number
    hobby: string[]
  }
  
  // 把 Props 接口中定义的属性变为只读
  type partialProps = Readonly<Props>
  
  let p: partialProps = {
    id: 1,
    hobby: ['吃饭', '睡觉']
  }
  
  p.id = 2 // ❌无法为“id”赋值，因为它是只读属性

#### 6.3 `Pink<Type>`

- `Pink<Type>`可以从 Type 中选择一组属性来构造新的类型。

  ```typescript
  interface Props {
    id: number
    title: string
    hobby: string[]
  }
  
  // PickProps 就有了 Props 中 id、title 两个属性
  type PickProps = Pick<Props, 'id' | 'title'>
  ```

  

#### 6.4 `Record<keys, Type>`

- `Record<keys, Type>`构造一个对象类型，属性键为 keys，属性类型为 Type。

  ```typescript
  type RecordObj = Record<'a' | 'b' | 'c', string[]>
  
  // 上面代码等价于：
  /* type RecordObj = {
    a: string[]
    b: string[]
    c: string[]
  } */
  
  let obj: RecordObj = {
    a: ['a'],
    b: ['b'],
    c: ['c']
  }
  ```

  

### 7. 索引签名类型

- 使用场景：当我们无法确定对象中有哪些属性时，就可以使用索引签名类型了。

- 对象：

  ```TypeScript
  interface anyObject {
    // [key: string] 来约束该接口中，只要是 string 类型的属性名称，都可以出现在对象中。
    [key: string]: number
  }

  let obj: anyObject = {
    a: 1,
    b: 2
  }
  ```

- 数组：

  ```TypeScript
  interface array<Type> {
    [index: number]: Type
  }
  
  let arr: array<number> = [1, 2, 3]
  let arr1: array<string> = ['1', '2', '3']
  ```

### 8. 映射类型

- 映射类型是基于旧类型，创建一个新类型（对象类型）。

- 映射类型是基于索引签名类型的，所以，该语法中也使用了索引签名类型，也使用了 `[]`。

- 注意：映射类型只能在类型别名（Type）中使用，不能在接口（interface）中使用。

  ```TypeScript
  type PropKeys = 'x' | 'y' | 'z'
  
  // 如果 PropKeys 的属性值很多时，下面的方法就显得乏力！
  type Type1 = { x: number; y: number; z: number }
  
  // 无论 PropKeys 的属性值有多少个，都会自动生成
  type Type2 = { [key in PropKeys]: number }
  ```

#### 8.1 `keyof`

- 映射类型既可以根据联合类型创建新类型，也可以根据对象类型创建新类型。

  ```TypeScript
  type Props = { a: string; b: number; c: boolean }
  
  // 首先，先执行 keyof Props，获取到对象类型 Props 中所有键的联合类型，即 'a' | 'b' | 'c'
  // 然后，key in... 表示 key 可以是 Props 中所有的键名称中的任意一个
  type newProps = { [key in keyof Props]: number }
  ```

#### 8.2 索引查询类型

- 语法格式：`T[p]`，在 TS 中叫做索引查询类型。

- 作用：用来查询属性的类型。

  ```TypeScript
  type Props = { a: number; b: string; c: boolean }
  
  type newProps = Props['a'] // number
  ```

#### 8.3 索引查询多个类型

```TypeScript
type Props = { a: number; b: string; c: boolean }

// 查询某几个
type newProps = Props['a' | 'b'] // number | string

// 查询所有
type newProps1 = Props[keyof Props] // number | string | boolean
```

