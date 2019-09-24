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
class Car {
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
container.set(Car)
// container.set('test', Car)
container.set('CONFIG', config)

const car = container.get(Car)

console.log(car)
console.log(container)

car.start()
car.driver.say()

const car1 = container.get<Car>('test')
const car2 = container.get<Car>('test')

console.log(car1, car === container.get(Car), car2 === car, car1 === car2)

const conf = container.get<ConfigType>('CONFIG')

console.log(conf.port)
