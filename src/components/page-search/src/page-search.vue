<template>
  <div class="page-search">
    <xt-form v-bind="IfromConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btn">
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </xt-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import XtForm from "@/base-ui/form"

export default defineComponent({
  components: {
    XtForm
  },
  props: {
    IfromConfig: {
      type: Object,
      reuqired: true
    }
  },
  emits: ["resetBtnClick", "searchBtnClick"],
  setup(props, { emit }) {
    // 动态绑定search
    const IfromItem = props.IfromConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of IfromItem) {
      formOriginData[item.field] = ""
    }
    const formData = ref(formOriginData)
    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
      }
      // formData.value = formOriginData
      emit("resetBtnClick")
    }
    // 点击搜索
    const handleQueryClick = () => {
      emit("searchBtnClick", formData)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped lang="less">
.handle-btn {
  text-align: right;
  padding: 0 30px 30px 0;
}
</style>
