type IFormItemType = "input" | "password" | "select" | "datepicker"

export interface IFormItem {
  field: string
  type: IFormItemType
  label: string
  rules?: any[]
  placeholder?: any
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}
export interface Ifrom {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  ItemStyle?: any
}
