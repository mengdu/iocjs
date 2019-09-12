import { setPropertyTypeMap, getPropertyTypeMap, getPropertyType } from '../meta'

export default function Inject (id?: any): PropertyDecorator {
  return function (target: any, property: string): any {
    // 获取注入属性的类型
    const propertyType = getPropertyType(target, property)

    const propertyTypesMap = getPropertyTypeMap(target)

    propertyTypesMap.set(property, { type: propertyType, id })

    setPropertyTypeMap(target, propertyTypesMap)
  }
}
