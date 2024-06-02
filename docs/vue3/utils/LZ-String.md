# LZ-String

> Github：https://github.com/pieroxy/lz-string/

LZ-String 是一个 JavaScript 库，用于压缩和解压缩字符串。它的主要优点是可以处理 Unicode 字符串，而且压缩后的字符串仍然是可打印的 ASCII 字符串。

## 安装

```shell
// 安装
pnpm install lz-string

// 导入
import LZString from "lz-string";
```

## 基本使用

### compress

```js
const str = "hello world";
```

```js
// compress 压缩
const compressedString = LZString.compress(str);
console.log(compressedString); // օ〶惶@✰ӈ

// decompress 解压
const decompressedString = LZString.decompress(compressedString);
console.log(decompressedString); // hello world
```

### compressToUTF16

压缩并编码为 UTF-16 的字符串。

```js
// compressToUTF16 压缩
const compressToUTF16String = LZString.compressToUTF16(str);
console.log(compressToUTF16String); // ˢ䰭䰾怤ޔ䂼怩䠠

// decompressFromUTF16 解压
const decompressFromUTF16String = LZString.decompressFromUTF16(
  compressToUTF16String
);
console.log(decompressFromUTF16String); // hello world
```

### compressToBase64

压缩并编码为 Base64 的字符串。

```js
// compressToBase64 压缩
const compressedToBase64String = LZString.compressToBase64(str);
console.log(compressedToBase64String); // BYUwNmD2AEDukCcwBMg=

// decompressFromBase64 解压
const decompressFromBase64String = LZString.decompressFromBase64(compressedToBase64String);
console.log(decompressFromBase64String); // hello world
```

## 解压缩 json

```js
const json = {
  name: "sunny",
  age: 20,
  hobby: ["basketball", "football"],
  address: {
    city: "beijing",
    country: "china"
  }
};

// 压缩的时候需要传入 字符串 ，因此先将对象转为字符串
const jsonString = JSON.stringify(json);

// compressToBase64 压缩
const compressedJsonString = LZString.compressToBase64(jsonString);
console.log(compressedJsonString);

// decompressFromBase64 解压
const decompressedJsonString =
  LZString.decompressFromBase64(compressedJsonString);
console.log(JSON.parse(decompressedJsonString));
```
