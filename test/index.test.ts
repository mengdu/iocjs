import { Container, Inject, Injectable } from '../src'

describe('test Container', () => {
  test('container.get throw error', () => {
    const container = new Container()

    expect(() => container.get('test')).toThrow()
  })

  test('container.get getting the same key must be the same', () => {
    const container = new Container()
    class Cat {}
    container.set(Cat)
    container.set('cat', Cat)
    
    const cat1 = container.get(Cat)
    const cat2 = container.get(Cat)

    expect(cat1 === cat2).toBe(true)
    expect(container.get('cat') === container.get('cat')).toBe(true)
    expect(cat1 === container.get('cat')).toBe(false)

    expect(cat1.constructor === Cat).toBe(true)
    expect(container.get('cat').constructor === Cat).toBe(true)
  })

  test('container.has, hasInstance', () => {
    const container = new Container()
    class Cat {}
    container.set(Cat)
    container.set('cat', Cat)

    expect(container.has(Cat)).toBe(true)
    expect(container.has('cat')).toBe(true)
    expect(container.has('test')).toBe(false)
    expect(container.hasInstance(Cat)).toBe(false)
    expect(container.hasInstance('cat')).toBe(false)

    container.remove(Cat)

    expect(container.has(Cat)).toBe(false)
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

    expect(cat.start()).toBe('start Engine')
    expect(cat.constructor).toBe(Cat)
    expect(cat.getEngine()).toBe(container.get(Engine))
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

    class Cat {
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
    container.set(Cat)
    container.set('CONFIG', config)

    const cat = container.get(Cat)

    expect(cat.start()).toBe('start Engine')
    expect(cat.constructor).toBe(Cat)
    expect(cat.getEngine()).toBe(container.get(Engine))
    expect(cat.options).toBe(config)
    expect(cat.options).toBe(container.get('CONFIG'))
  })
})
