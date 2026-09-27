import { createContext, useContext, type Dispatch } from 'react'
import type { Action, State } from './state'

export const AppCtx = createContext<{ s: State; d: Dispatch<Action> }>(null!)
export const useApp = () => useContext(AppCtx)
