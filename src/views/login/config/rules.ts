export const accountRules = {
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
  ]
}

export const phoneRules = {
  phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
  code: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    { min: 4, max: 6, message: "长度在 4 到 6 个字符", trigger: "blur" }
  ]
}
