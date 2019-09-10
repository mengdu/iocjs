import { Container, Inject, Injectable } from '../src'

const container = new Container()

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

@Injectable()
class Cat {
  @Inject()
  readonly engine: Engine;

  constructor (public driver: Driver) {}

  start () {
    this.engine.start()
  }
}

container.set(Engine)
container.set(Driver)
container.set(Cat)

const cat = container.get(Cat)

console.log(cat)

cat.start()
cat.driver.say()
