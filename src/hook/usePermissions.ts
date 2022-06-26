import { useStore } from "vuex"

export function usePermissions(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.loginModules.permissions
  const verifyPermissions = `system:${pageName}:${handleName}`
  return !!permissions.find((item: string) => item === verifyPermissions)
}
