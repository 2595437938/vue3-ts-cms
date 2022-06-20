<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTabs">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>
    <div class="login-cont">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handelLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LoginAccount from "./LoginAccount.vue"
import LoginPhone from "./LoginPhone.vue"

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(false)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTabs = ref("account")

    const handelLogin = () => {
      if (currentTabs.value === "account") {
        accountRef.value?.loginAccount(isKeepPassword.value)
      } else {
        phoneRef.value?.LoginPhone(isKeepPassword.value)
      }
    }
    return {
      isKeepPassword,
      handelLogin,
      phoneRef,
      accountRef,
      currentTabs
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 360px;
  margin-bottom: 90px;
  .title {
    text-align: center;
  }
  .login-cont {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
