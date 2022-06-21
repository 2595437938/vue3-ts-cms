<template>
  <div class="user">
    <div class="search">
      <xt-form v-bind="IfromConfig" v-model="formData" />
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import XtForm from "@/base-ui/form"
import { IfromConfig } from "./config/search.config"

export default defineComponent({
  name: "user",
  components: {
    XtForm
  },
  setup() {
    const formData = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      createTime: ""
    })
    return {
      IfromConfig,
      formData
    }
  }
})
</script>

<style scoped></style>
