<template>
  <div class="login-account">
    <el-form
      :model="account"
      :rules="accountRules"
      ref="form"
      label-width="60px"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { ElForm } from "element-plus"
import { ElMessage } from "element-plus"
import { defineComponent, reactive, ref } from "vue"
import { accountRules } from "../config/rules"
import LocalCache from "@/utils/cache"
export default defineComponent({
  setup() {
    const account = reactive({
      name: LocalCache.getCache("name") || "",
      password: LocalCache.getCache("password") || ""
    })
    const form = ref<InstanceType<typeof ElForm>>()

    const store = useStore()

    const loginAccount = (isKeepPassword: boolean) => {
      form?.value?.validate((valid) => {
        if (valid) {
          console.log(account)
          if (isKeepPassword) {
            LocalCache.setCache("name", account.name)
            LocalCache.setCache("password", account.password)
          } else {
            LocalCache.deleteCache("name")
            LocalCache.deleteCache("password")
          }
          // 存储相关数据
          store.dispatch("loginModules/acctountLoginAction", { ...account })
        } else {
          ElMessage.error("账号或者密码错误")
        }
      })
    }

    return {
      account,
      accountRules,
      loginAccount,
      form
    }
  }
})
</script>

<style scoped></style>
