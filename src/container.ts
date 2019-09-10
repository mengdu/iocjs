import 'reflect-metadata'
import { Type } from './interfaces'
import { getConstructorParams, getPropertyTypeMap } from './meta'

class Container {
  private readonly providers: Set<any> = new Set();
  private readonly instances: Map<any, any> = new Map();

  get <T> (provider: Type<T>): T {
    if (this.instances.has(provider)) return this.instances.get(provider)

    return this.createInstance(provider)
  }

  set <T> (provider: T) {
    this.providers.add(provider)
  }

  has<T> (provider: T): boolean {
    return this.providers.has(provider)
  }

  private createInstance<T> (provider: Type<T>): T {
    if (!this.providers.has(provider)) throw new Error(`Undefined dependencies '${provider.name}' cannot be instantiated`)

    // 获取构造函数参数
    const paramtypes = getConstructorParams(provider)

    const constructorParams = paramtypes.map(e => this.get(e))

    const instance = new provider(...constructorParams)

    // 获取注入属性
    const propertyTypeMap = getPropertyTypeMap(instance)

    propertyTypeMap.forEach((value, key) => {
      instance[key] = this.get(value)
    })

    this.instances.set(provider, instance)

    return instance
  }
}

export default Container
