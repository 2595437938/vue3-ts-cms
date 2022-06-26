import { Ifrom } from "@/base-ui/form"

export const IfromConfig: Ifrom = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      rules: [],
      placeholder: "请输入角色名"
    },
    {
      field: "intro",
      type: "input",
      label: "权限介绍",
      rules: [],
      placeholder: "请输入权限介绍"
    },
    {
      field: "createTime",
      type: "datepicker",
      label: "时间",
      rules: [],
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }
  ],
  labelWidth: "120px",
  ItemStyle: {
    padding: "10px 30px"
  }
}
