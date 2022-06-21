<template>
  <div class="xt-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.lable">
          <el-col v-bind="colLayout" :span="8">
            <el-form-item :label="item.label" :style="ItemStyle">
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-bind="item.otherOptions"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.flieId}`]"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.flieId}`]"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :value="option.value"
                      v-bind="item.otherOptions"
                      >{{ option.label }}</el-option
                    >
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.flieId}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue"
import { IFormItem } from "../type/index"

export default defineComponent({
  props: {
    modelValue: {
      type: Object
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      defalult: () => []
    },
    labelWidth: {
      type: String,
      defalult: "120px"
    },
    ItemStyle: {
      type: Object,
      defalult: () => ({ padding: "5px 30px" })
    },
    colLayout: {
      type: Object,
      defalult: () => ({
        xl: "6",
        lg: "8",
        md: "12",
        sm: "24",
        xs: "24"
      })
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const formData = ref({ ...props.modelValue })
    watch(
      formData,
      (newValue) => {
        emit("update:modelValue", newValue)
      },
      { deep: true }
    )
    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.xt-form {
  padding-top: 22px;
}
</style>
