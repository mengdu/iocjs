import { getClassParamtypes, setConstructorParams } from '../meta'

export default function Injectable () {
  return function (target: any) {
    const paramTypes = getClassParamtypes(target)

    setConstructorParams(target, paramTypes)
  }
}
