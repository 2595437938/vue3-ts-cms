import { ref } from "vue"
import PageContent from "@/components/page-content"

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  const resetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  const searchBtnClick = (formData: any) => {
    pageContentRef.value?.getPageData(formData.value)
  }
  return [pageContentRef, resetBtnClick, searchBtnClick]
}
