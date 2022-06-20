<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFlodClick"
      ><Fold v-if="!isFold" /><Expand v-else
    /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({
  emits: ["FlodChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFlodClick = () => {
      isFold.value = !isFold.value
      emit("FlodChange", isFold.value)
    }
    return {
      isFold,
      handleFlodClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
