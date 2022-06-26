<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="30%"
      center
      destroy-on-close
    >
      <xt-form v-bind="modalConfig" v-model="formData"></xt-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClcik">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import XtForm from "@/base-ui/form"
import { useStore } from "vuex"

export default defineComponent({
  components: {
    XtForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const title = ref("新建")
    const formData = ref<any>({})
    const store = useStore()

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
        console.log(formData)
      }
    )

    // 确认
    const handleConfirmClcik = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        const params = {
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id
        }
        store.dispatch("system/editPageDataAction", params)
      } else {
        // 新增
        const params = {
          pageName: props.pageName,
          newData: { ...formData.value }
        }
        store.dispatch("system/createPageDataAction", params)
      }
    }
    return {
      dialogVisible,
      title,
      formData,
      handleConfirmClcik
    }
  }
})
</script>

<style scoped></style>
