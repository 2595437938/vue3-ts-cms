import { Ifrom } from "@/base-ui/form"

export const IfromConfig: Ifrom = {
  formItems: [
    {
      flieId: "name",
      type: "input",
      label: "用户名",
      rules: [],
      placeholder: "请输入用户名"
    },
    {
      flieId: "id",
      type: "input",
      label: "ID",
      rules: [],
      placeholder: "请输入ID"
    },
    {
      flieId: "password",
      type: "input",
      label: "密码",
      rules: [],
      placeholder: "请输入密码"
    },
    {
      flieId: "sport",
      type: "select",
      label: "运动",
      rules: [],
      placeholder: "请选择运动",
      options: [
        { label: "足球", value: "0" },
        { label: "排球", value: "1" },
        { label: "篮球", value: "2" }
      ]
    },
    {
      flieId: "createTime",
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
