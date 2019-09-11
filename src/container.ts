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

    const constructorParams = inject.args.map(e => this.get(e))

    // 实例化依赖
    const instance = new Provider(...constructorParams)

    // 获取注入属性
    const propertyTypeMap = getPropertyTypeMap(instance)

    // 注入属性
    propertyTypeMap.forEach((value, key) => {
      instance[key] = this.get(value)
    })

    this.instances.set(identifier, instance)

    return instance
  }
}

export default Container
