<template>
  <div class="user">
    <div class="search">
      <page-search
        :IfromConfig="IfromConfig"
        @resetBtnClick="resetBtnClick"
        @searchBtnClick="searchBtnClick"
      ></page-search>
    </div>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @handleEditClick="handleEditClick"
      @handleNewClick="handleNewClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "vuex"

import { IfromConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import pageModal from "@/components/page-modal"

import { usePageSearch } from "@/hook/usePageSearch"
import { usePageModal } from "@/hook/usePageModal"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    pageModal
  },
  setup() {
    const [pageContentRef, resetBtnClick, searchBtnClick] = usePageSearch()
    // 区分新建与编辑
    const newCallback = () => {
      const formItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )
      formItem!.isHidden = false
    }
    const editCallback = () => {
      const formItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )
      formItem!.isHidden = true
    }
    // 添加部门和角色列表 不需要可以不传
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      )

      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return {
            title: item.name,
            value: item.id
          }
        }
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      )

      roleItem!.options = store.state.entireRole.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      return modalConfig
    })
    const [pageModalRef, handleNewClick, handleEditClick, defaultInfo] =
      usePageModal(newCallback, editCallback)

    return {
      IfromConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      resetBtnClick,
      searchBtnClick,
      pageModalRef,
      defaultInfo,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less"></style>
