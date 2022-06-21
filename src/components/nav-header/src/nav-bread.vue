<template>
  <div class="nav-bread">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="item in bread" :key="item.path">{{
        item.name
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    bread: {
      type: Array,
      require: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
