<template>
  <div class="nav-menu">
    <div class="login">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">太平山修真我</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <template v-for="item in userMenu" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template v-slot:title>
              <!-- <i v-if="item.icon" :class="item.icon" key="item.id"></i> -->
              <el-icon color="pink"><Sunny style="color: pink" /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuClick(subItem)"
              >
                <!-- <i v-if="subItem.icon" :class="subItem.icon" key="item.id"></i> -->
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="subItem.id + ''">
            <!-- <i v-if="item.icon" :class="item.icon" key="item.id"></i> -->
            <el-icon><View /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from "vue-router"

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const userMenu = computed(() => store.state.loginModules.userMenus)
    const router = useRouter()
    const handleMenuClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found"
      })
    }
    return {
      userMenu,
      handleMenuClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .login {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
    color: #fff !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  .el-menu-item {
    color: #fff !important;
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
