<template>
  <div class="login-account">
    <el-form :model="account" :rules="phoneRules" ref="form" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input
            v-model="account.code"
            placeholder="请输入验证码"
          ></el-input>
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { ElMessage } from "element-plus"
import { defineComponent, reactive, ref } from "vue"
import { ElForm } from "element-plus"
import { phoneRules } from "../config/rules"
import LocalCache from "@/utils/cache"

export default defineComponent({
  setup() {
    const account = reactive({
      phone: "",
      code: ""
    })
    const form = ref<InstanceType<typeof ElForm>>()
    const store = useStore()

    const LoginPhone = (isKeepPassword: boolean) => {
      form?.value?.validate((valid) => {
        if (valid) {
          console.log(account)
          if (isKeepPassword) {
            LocalCache.setCache("phone", account.phone)
            LocalCache.setCache("code", account.code)
          } else {
            LocalCache.deleteCache("phone")
            LocalCache.deleteCache("code")
          }
          // 存储相关数据
          store.dispatch("loginModules/phoneLoginAction", { ...account })
        } else {
          ElMessage.error("手机号或者密码错误")
        }
      })
    }
    return { account, phoneRules, LoginPhone, form, store }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 10px;
}
</style>
