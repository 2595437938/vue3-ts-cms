<template>
  <div class="role">
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
      pageName="role"
      @handleEditClick="handleEditClick"
      @handleNewClick="handleNewClick"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="treeData"
          :props="{
            label: 'name',
            children: 'children'
          }"
          @check="handleCheboxClick"
          node-key="id"
          show-checkbox
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue"
import { useStore } from "vuex"
import { getMenuLeafKeys } from "@/utils/menu"
import { ElTree } from "element-plus"
import PageContent from "@/components/page-content/index"
import PageSearch from "@/components/page-search"
import pageModal from "@/components/page-modal"

import { IfromConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalConfig } from "./config/modal.config"

import { usePageSearch } from "@/hook/usePageSearch"
import { usePageModal } from "@/hook/usePageModal"

export default defineComponent({
  name: "role",
  components: {
    PageContent,
    PageSearch,
    pageModal
  },
  setup() {
    // 角色权限树数据获取
    const store = useStore()
    const treeData = computed(() => store.state.entireMenu)
    const [pageContentRef, resetBtnClick, searchBtnClick] = usePageSearch()
    // 区分新建与编辑
    const newCallback = () => {
      const formItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      )
      formItem!.isHidden = false
    }
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        console.log(leafKeys)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, handleNewClick, handleEditClick, defaultInfo] =
      usePageModal(undefined, editCallback)
    const otherInfo = ref({})
    const handleCheboxClick = (data1: any, data2: any) => {
      console.log(data1)
      console.log(data2)
      const menus1 = data2.halfCheckedKeys
      const menus2 = data2.checkedKeys
      const menuList = [...menus1, ...menus2]
      otherInfo.value = { menuList }
    }
    return {
      contentTableConfig,
      IfromConfig,
      pageContentRef,
      resetBtnClick,
      searchBtnClick,
      pageModalRef,
      modalConfig,
      handleNewClick,
      handleEditClick,
      defaultInfo,
      treeData,
      otherInfo,
      handleCheboxClick,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 65px;
}
</style>
