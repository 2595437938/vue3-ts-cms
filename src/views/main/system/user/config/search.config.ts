import { Ifrom } from "@/base-ui/form"

export const IfromConfig: Ifrom = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "用户名",
      rules: [],
      placeholder: "请输入用户名"
    },
    {
      field: "id",
      type: "input",
      label: "ID",
      rules: [],
      placeholder: "请输入ID"
    },
    {
      field: "realname",
      type: "input",
      label: "真实姓名",
      rules: [],
      placeholder: "请输入真实姓名"
    },
    {
      field: "cellphone",
      type: "input",
      label: "手机号",
      rules: [],
      placeholder: "请输入手机号"
    },
    {
      field: "enable",
      type: "select",
      label: "状态",
      rules: [],
      placeholder: "请选择状态",
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 }
      ]
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
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
