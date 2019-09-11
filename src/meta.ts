import 'reflect-metadata'
import { PROPERTY_TYPE, INJECT_CONSTRUCTOR } from './constants'

// 获取构造函数参数类型（ts才有）
export const getClassParamtypes = function (target: any): any[] {
  return Reflect.getMetadata('design:paramtypes', target) || []
}

export const getInjectConstructor = function (target: any): { id?: string, args: any[] } {
  return Reflect.getMetadata(INJECT_CONSTRUCTOR, target) || { args: [] }
}

export const setInjectConstructor = function (target: any, value: any) {
  Reflect.defineMetadata(INJECT_CONSTRUCTOR, value, target)
}

// 获取属性的类型
export const getPropertyType = function (target: any, property: string): any {
  return Reflect.getMetadata('design:type', target, property)
}

export const getPropertyTypeMap = function (target: any): Map<any, any> {
  return Reflect.getMetadata(PROPERTY_TYPE, target) || new Map()
}

export const setPropertyTypeMap = function (target: any, value: Map<any, any>) {
  Reflect.defineMetadata(PROPERTY_TYPE, value, target)
}
