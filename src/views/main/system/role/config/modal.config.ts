import { Ifrom } from "@/base-ui/form/type"

export const modalConfig: Ifrom = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      rules: [],
      placeholder: "请输入用户名"
    },
    {
      field: "intro",
      type: "input",
      label: "角色介绍",
      rules: [],
      placeholder: "请输入角色介绍"
    }
  ],
  colLayout: { span: 24 },
  ItemStyle: {}
}
