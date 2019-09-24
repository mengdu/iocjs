import { Container, Inject, Injectable } from '../src'

describe('test Container', () => {
  test('container.get throw error', () => {
    const container = new Container()

    expect(() => container.get('test')).toThrow()
  })

  test('container.get getting the same key must be the same', () => {
    const container = new Container()
    class Car {}
    container.set(Car)
    container.set('car', Car)
    
    const car1 = container.get(Car)
    const car2 = container.get(Car)

    expect(car1 === car2).toBe(true)
    expect(container.get('car') === container.get('car')).toBe(true)
    expect(car1 === container.get('car')).toBe(false)

    expect(car1.constructor === Car).toBe(true)
    expect(container.get('car').constructor === Car).toBe(true)
  })

  test('container.has, hasInstance', () => {
    const container = new Container()
    class Car {}
    container.set(Car)
    container.set('car', Car)

    expect(container.has(Car)).toBe(true)
    expect(container.has('car')).toBe(true)
    expect(container.has('test')).toBe(false)
    expect(container.hasInstance(Car)).toBe(false)
    expect(container.hasInstance('car')).toBe(false)

    container.remove(Car)

    expect(container.has(Car)).toBe(false)
  })
})

describe('test Inject, Injectable', () => {
  test('test Injectable', () => {
    class Engine {
      start () {
        return 'start Engine'
      }
    }

    @Injectable()
    class Car {
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
    container.set(Car)

    const car = container.get(Car)

    expect(car.start()).toBe('start Engine')
    expect(car.constructor).toBe(Car)
    expect(car.getEngine()).toBe(container.get(Engine))
  })

  test('test Inject', () => {
    const config = {
      card: 1001,
      key: 123456
    }

    class Engine {
      start () {
        return 'start Engine'
      }
    }

    class Car {
      @Inject()
      private readonly engine: Engine

      @Inject('CONFIG')
      readonly options;

      start () {
        return this.engine.start()
      }

      getEngine () {
        return this.engine
      }
    }

    const container = new Container()

    container.set(Engine)
    container.set(Car)
    container.set('CONFIG', config)

    const car = container.get(Car)

    expect(car.start()).toBe('start Engine')
    expect(car.constructor).toBe(Car)
    expect(car.getEngine()).toBe(container.get(Engine))
    expect(car.options).toBe(config)
    expect(car.options).toBe(container.get('CONFIG'))
  })
})
