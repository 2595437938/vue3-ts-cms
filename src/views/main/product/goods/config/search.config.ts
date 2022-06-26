import { Ifrom } from "@/base-ui/form"

export const IfromConfig: Ifrom = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "商品名称",
      rules: [],
      placeholder: "请输入商品名称"
    },
    {
      field: "oldPrice",
      type: "input",
      label: "原价格",
      rules: [],
      placeholder: "请输入原价格"
    },
    {
      field: "newPrice",
      type: "input",
      label: "现价格",
      rules: [],
      placeholder: "请输入现价格"
    },
    {
      field: "status",
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
