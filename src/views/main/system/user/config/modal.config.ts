import { Ifrom } from "@/base-ui/form/type"

export const modalConfig: Ifrom = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "用户名",
      rules: [],
      placeholder: "请输入用户名"
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名",
      rules: [],
      placeholder: "请输入真实姓名"
    },
    {
      field: "password",
      type: "password",
      label: "密码",
      rules: [],
      placeholder: "请输入密码",
      isHidden: true
    },
    {
      field: "cellphone",
      type: "input",
      label: "电话号码",
      rules: [],
      placeholder: "请输入电话号码"
    },
    {
      field: "departmentId",
      type: "select",
      label: "部门",
      rules: [],
      placeholder: "请选择部门",
      options: []
    },
    {
      field: "roleId",
      type: "select",
      label: "角色",
      rules: [],
      placeholder: "请选择角色",
      options: []
    }
  ],
  colLayout: { span: 24 },
  ItemStyle: {}
}
