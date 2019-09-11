import { getClassParamtypes, setInjectConstructor } from '../meta'

export default function Injectable (id?: string) {
  return function (target: any) {
    const paramTypes = getClassParamtypes(target)

    setInjectConstructor(target, { id, args: paramTypes })
  }
}
