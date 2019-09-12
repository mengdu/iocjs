import { Container, Inject, Injectable } from '../src'

const container = new Container()

interface ConfigType {
  port: number,
  card?: number
}

const config: ConfigType = {
  port: 3000,
  card: 1001
}
class Engine {
  start () {
    console.log('start Engine')
  }
}

class Driver {
  say () {
    console.log('ok')
  }
}

@Injectable('test')
class Cat {
  @Inject()
  readonly engine: Engine;

  @Inject('CONFIG')
  readonly config: ConfigType;

  constructor (public driver: Driver) {}

  start () {
    this.engine.start()
  }
}

container.set(Engine)
container.set(Driver)
container.set(Cat)
// container.set('test', Cat)
container.set('CONFIG', config)

const cat = container.get(Cat)

console.log(cat)
console.log(container)

cat.start()
cat.driver.say()

const cat1 = container.get<Cat>('test')
const cat2 = container.get<Cat>('test')

console.log(cat1, cat === container.get(Cat), cat2 === cat, cat1 === cat2)

const conf = container.get<ConfigType>('CONFIG')

console.log(conf.port)
