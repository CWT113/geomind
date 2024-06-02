# Pubsub-JS

>npm库：https://www.npmjs.com/package/pubsub-js

>Github：https://sahadar.github.io/pubsub/

PubSubJS 是一个用 JavaScript 编写的**基于主题的发布/订阅**库。

PubSubJS 具有同步解耦功能，因此主题是异步发布的。这有助于保持程序的可预测性，因为在使用者处理主题时，主题的发起者不会被阻止。



## 主要特点

- 无依赖
- 同步去耦
- 小（ish），小于1kb缩小和压缩
- 易于理解和使用（得益于同步解耦）
- 不修改订阅者（jQuery 自定义事件修改订阅者）
- 兼容 ES3。PubSubJS 应该能够在任何可以执行 JavaScript 的地方运行。



## 安装

使用 npm 安装：

```shell
pnpm i pubsub-js
```

在使用时导入模块：

```js
import PubSub from 'pubsub-js'
```



## 基本示例

在 App.vue 中，使用 `PubSub.publish()` 发布事件：

```js
import { onMounted } from "vue";
import PubSub from "pubsub-js";

onMounted(() => {
  PubSub.publish("my topic", "hello world");
});
```

在 HelloWorld.vue 中，使用 `PubSub.subscribe()` 进行订阅：

```js
import PubSub from "pubsub-js";

PubSub.subscribe("my topic", function (msg, data) {
  console.log(msg);    // my topic
  console.log(data);   // hello world
});
```



## 取消特定订阅

可以为 `PubSub.subscribe()`函数指定一个 **名称**，用于 取消订阅：

```js
import PubSub from "pubsub-js";

const token = PubSub.subscribe("my topic", function (msg, data) {});

// 取消订阅
PubSub.unsubscribe(token);
```

也可以直接使用 发布事件 的名称，取消订阅：

```js
import PubSub from "pubsub-js";

PubSub.subscribe("my topic", function (msg, data) {});

// 取消订阅
PubSub.unsubscribe("my topic");
```



## 清楚所有订阅

```js
// 清楚所有订阅
PubSub.clearAllSubscriptions()
```



## 获取订阅

```js
// 获取订阅
PubSub.getSubscriptions('my topic');
```



## 计算订阅数

```js
// 计算订阅数
PubSub.countSubscriptions('token');
```



## 是否被订阅

在 发布事件时，可以为事件取一个 **名称**，它的返回值是一个 `boolean` 类型，如果该事件有订阅，则是 `true`，否则为 `false`。

```js
// 该事件已被订阅
const isPublished = PubSub.publish("my topic", "hello world");

console.log(isPublished); // true
```



## 常量技巧

建议：对主题使用 “常量”，而不是字符串文字。

这样的好处是，你可以设定全局对同一个字符串只能发布一次，从而不会导致事件名称被重复发布。

示例：

```js
// 👎 Bad usage
PubSub.publish('hello', 'world');

PubSub.subscribe('hello', function (msg, data) {
	console.log(data)
});
```

```js
// 👍 Better usage
const MY_TOPIC = Symbol('MY_TOPIC')

PubSub.publish(MY_TOPIC, 'world');

PubSub.subscribe(MY_TOPIC, function (msg, data) {
	console.log(data)
});
```