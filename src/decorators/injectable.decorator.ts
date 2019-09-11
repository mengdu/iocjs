import { getClassParamtypes, setInjectConstructor } from '../meta'

export default function Injectable () {
  return function (target: any) {
    const paramTypes = getClassParamtypes(target)

    setInjectConstructor(target, { args: paramTypes })
  }
}
