<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFlodClick"
      ><Fold v-if="!isFold" /><Expand v-else
    /></el-icon>
    <div class="content">
      <div>
        <nav-bread :bread="bread" />
      </div>
      <div class="user-info">
        <el-dropdown class="user-avater">
          <span class="el-dropdown-link">
            <el-avatar
              size="small"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            />
            <span class="info-name">{{ name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                ><el-icon><CloseBold /></el-icon>退出登录</el-dropdown-item
              >
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>关于</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { useStore } from "vuex"
import navBread from "./nav-bread.vue"
import { useRoute } from "vue-router"
import { pathMapBreadMenu } from "@/utils/menu"

export default defineComponent({
  components: {
    navBread
  },
  emits: ["FlodChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    // 拿到store里的name
    const store = useStore()
    const name = computed(() => store.state.loginModules.userInfo.name)
    const handleFlodClick = () => {
      isFold.value = !isFold.value
      emit("FlodChange", isFold.value)
    }
    let bread: any = computed(() => {
      // 面包屑数据
      const userMenus = store.state.loginModules.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadMenu(userMenus, currentPath)
    })
    console.log(bread)

    return {
      isFold,
      name,
      bread,
      handleFlodClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .user-avater {
    cursor: pointer;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
    .info-name {
      margin-left: 5px;
    }
  }
}
</style>
