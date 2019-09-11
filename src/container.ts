import { Type } from './interfaces'
import { getInjectConstructor, getPropertyTypeMap } from './meta'

class Container {
  private readonly providers: Map<any, any> = new Map();
  private readonly instances: Map<any, any> = new Map();

  get <T> (id: Type<T> | string): T {
    const identifier = id

    if (this.instances.has(identifier)) {
      return this.instances.get(identifier)
    }

    return this.createInstance(identifier)
  }

  set (id: any, provider?: any) {
    if (this.has(id)) throw new Error(`Dependency '${id.name || id}' cannot be reinjected`)

    if (typeof provider !== 'undefined') {
      this.providers.set(id, provider)
    } else {
      this.providers.set(id, id)
    }
  }

  has (id: any): boolean {
    return this.providers.has(id)
  }

  private createInstance<T> (identifier: any): T {
    if (!this.providers.has(identifier)) {
      throw new Error(`Undefined dependencies '${identifier.name || identifier}' please declare it in the container before injection.`)
    }

    const Provider = this.providers.get(identifier)

    // 非函数类型直接返回值
    if (typeof Provider !== 'function') {
      return Provider
    }

    const inject = getInjectConstructor(Provider)

    // 如果定义了id注入，则注入一个id
    if (inject.id && !this.has(inject.id)) {
      this.set(inject.id, Provider)
    }

    const constructorParams = inject.args.map(e => this.get(e))

    // 实例化依赖
    const instance = new Provider(...constructorParams)

    // 获取注入属性
    const propertyTypeMap = getPropertyTypeMap(instance)

    // 注入属性
    propertyTypeMap.forEach((value, key) => {
      // 优先使用id查依赖
      instance[key] = this.get(value.id || value.type)
    })

    this.instances.set(identifier, instance)

    return instance
  }
}

export default Container
