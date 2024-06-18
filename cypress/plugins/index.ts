import { signIn, signOut } from './tasks'

export default (on: any, config: any) => {
  on('task', {
    signIn,
    signOut,
  })

  return config
}
