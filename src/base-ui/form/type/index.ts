type IFormItemType = "input" | "password" | "select" | "datepicker"

export interface IFormItem {
  flieId: string
  type: IFormItemType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
}
export interface Ifrom {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  ItemStyle?: any
}
