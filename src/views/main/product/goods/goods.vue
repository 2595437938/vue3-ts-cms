<template>
  <div class="goods">
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
      pageName="goods"
    >
      <template #image="scope">
        <!-- <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image> -->
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
        />
      </template>
      <template #oldPrice="scope"> ${{ scope.row.oldPrice }} </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PageContent from "@/components/page-content"
import PageSearch from "@/components/page-search"

import { contentTableConfig } from "./config/content.config"
import { IfromConfig } from "./config/search.config"
import { usePageSearch } from "@/hook/usePageSearch"

export default defineComponent({
  name: "goods",
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    const [pageContentRef, resetBtnClick, searchBtnClick] = usePageSearch()
    return {
      contentTableConfig,
      IfromConfig,
      pageContentRef,
      resetBtnClick,
      searchBtnClick
    }
  }
})
</script>

<style scoped></style>
