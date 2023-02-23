import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client'

type GlobalState = {
  isLoadingGlobal: boolean
}

const globalInitialValues: GlobalState = {
  isLoadingGlobal: false,
}

const globalVar = makeVar<GlobalState>(globalInitialValues)

export const useGlobalState = (): [GlobalState, ReactiveVar<GlobalState>] => {
  const global = useReactiveVar(globalVar)

  return [global, globalVar]
}
