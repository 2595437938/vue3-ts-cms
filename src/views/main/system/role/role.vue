<template>
  <div class="role">
    <div class="search">
      <page-search :IfromConfig="IfromConfig"></page-search>
    </div>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PageContent from "@/components/page-content/index"
import PageSearch from "@/components/page-search"
import { IfromConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

export default defineComponent({
  name: "role",
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    return {
      contentTableConfig,
      IfromConfig
    }
  }
})
</script>

<style scoped></style>
