import { ref } from "vue"
import pageModal from "@/components/page-modal"

type callFn = () => void
export function usePageModal(newCb: callFn, editCb: callFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const defaultInfo = ref({})
  const handleNewClick = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.title = "新建"
    }
    newCb && newCb()
  }
  const handleEditClick = (formData: any) => {
    defaultInfo.value = { ...formData }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      pageModalRef.value.title = "编辑"
    }
    editCb && editCb()
  }
  return [pageModalRef, handleNewClick, handleEditClick, defaultInfo]
}
