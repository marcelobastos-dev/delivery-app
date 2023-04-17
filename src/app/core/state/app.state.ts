import { ISessionState } from './reducers/auth.reducer'

export interface IAppState {
  core: ICoreState
}

export interface ICoreState {
  session: ISessionState
}
