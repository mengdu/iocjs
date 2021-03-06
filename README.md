# IoC

通过 typescript 实现的控制反转依赖注入


> 目前仅是个探索例子


```ts
import { Container, Inject, Injectable } from 'iocjs'

class Engine {
  start () {
    return 'start Engine'
  }
}

const config = {
  card: 10001,
  key: 123456
}

@Injectable()
class Car {
  @Inject('CONFIG')
  readonly options;

  constructor (private readonly engine: Engine) {}

  start () {
    return this.engine.start()
  }

  getEngine () {
    return this.engine
  }
}

const container = new Container()

container.set(Engine)
container.set('CONFIG', config)
container.set(Car)

const car = container.get(Car)

car.start() // start Engine
car.options === config // true
```

### API

 + `new Container()` 创建一个容器
 + `@Injectable(id?: string)` 构造函数可以注入（会自动注入构造函数参数）
 + `@Inject(id?: any)` 注入属性

#### Container

  + `container.set(id: any, provider?: any)` 向容器添加提供者
  + `container.get(id: any)` 获取一个提供者实例（只实例化一次）
  + `container.has(id: any)` 判断是否存在提供者
  + `container.hasInstance(id: any)` 判断是否存在提供者实例
  + `container.remove(id: any)` 移除一个提供者
  + `container.destroyInstance(id: any)` 销毁提供者实例


## Other

参考：

+ [injection](https://github.com/midwayjs/injection)
+ [依赖注入](https://midwayjs.org/midway/ioc.html)
+ [kingfolk/dilight](https://github.com/kingfolk/dilight)
+ [Typescript之 200行实现依赖注入](https://zhuanlan.zhihu.com/p/59771686)
