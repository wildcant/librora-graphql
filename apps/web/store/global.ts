import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client'

interface IGlobalState {
  isLoadingGlobal: boolean
}

const globalInitialValues: IGlobalState = {
  isLoadingGlobal: false,
}

const globalVar = makeVar<IGlobalState>(globalInitialValues)

export const useGlobalState = (): [IGlobalState, ReactiveVar<IGlobalState>] => {
  const global = useReactiveVar(globalVar)

  return [global, globalVar]
}
