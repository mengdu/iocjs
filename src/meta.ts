import 'reflect-metadata'
import { PROPERTY_TYPE, CONSTRUCTOR_PARAMS } from './constants'

export const getClassParamtypes = function (target: any): any[] {
  return Reflect.getMetadata('design:paramtypes', target) || []
}

export const getConstructorParams = function (target: any): any[] {
  return Reflect.getMetadata(CONSTRUCTOR_PARAMS, target) || []
}

export const setConstructorParams = function (target: any, value: any) {
  Reflect.defineMetadata(CONSTRUCTOR_PARAMS, value, target)
}

// 获取属性的类型/值
export const getPropertyType = function (target: any, property: string): any {
  return Reflect.getMetadata('design:type', target, property)
}

export const getPropertyTypeMap = function (target: any): Map<any, any> {
  return Reflect.getMetadata(PROPERTY_TYPE, target) || new Map()
}

export const setPropertyTypeMap = function (target: any, value: Map<any, any>) {
  Reflect.defineMetadata(PROPERTY_TYPE, value, target)
}
