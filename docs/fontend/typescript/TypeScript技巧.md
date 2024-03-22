# TypeScript

## 类型复用

1. 复用 `type` 定义的类型：

   ```typescript
   type Point = {
     x: number;
     y: number;
   };
   
   type Coordinate = Point & {
     z: number;
   };
   ```

2. 复用 `interface` 定义的类型：

   ```typescript
   interface Point {
     x: number;
     y: number;
   }
   
   interface Coordinate extends Point {
     z: number;
   }
   ```

3. `interface` 复用 `type` 定义的类型：

   ```typescript
   type Point = {
     x: number;
     y: number;
   };
   
   interface Coordinate extends Point {
     z: number;
   }
   ```

4. `type` 复用 `interface` 定义的类型：

   ```typescript
   interface Point {
     x: number;
     y: number;
   }
   
   type Coordinate = Point & {
     z: number;
   };
   ```

   

## 提取/排除属性

Props 接口需要被复用，但是需要排除 gender 字段，添加 hobby 字段：

```typescript
interface Props {				interface Props1 {
  name: string;					  name: string;	
  age: number;			=>		  age: number;
  gender: string;				  hobby: string;
}								}
```

```typescript
// Omit 排除属性
interface Props1 extends Omit<Props, "gender"> {
  hobby: string;
}

// Pick 取出属性
interface Props1 extends Pick<Props, "name" | "age"> {
  hobby: string;
}
```



























