import { setPropertyTypeMap, getPropertyTypeMap, getPropertyType } from '../meta'

export default function Inject (): PropertyDecorator {
  return function (target: any, property: string): any {
    // 获取注入属性的类型/值
    const propertyType = getPropertyType(target, property)

    const propertyTypesMap = getPropertyTypeMap(target)

    propertyTypesMap.set(property, propertyType)

    setPropertyTypeMap(target, propertyTypesMap)
  }
}
