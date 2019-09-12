# Loc

通过 typescript 实现的控制反转依赖注入

> 目前仅是个探索例子

```ts
import { Container, Inject, Injectable } from 'locjs'

class Engine {
  start () {
    return 'start Engine'
  }
}

@Injectable()
class Cat {
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
container.set(Cat)

const cat = container.get(Cat)

cat.start() // start Engine
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
