export const contentTableConfig = {
  title: "菜单列表",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "80" },
    { prop: "type", label: "菜单类型", minWidth: "40" },
    { prop: "url", label: "菜单url", minWidth: "40" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "按钮权限", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "100",
      slotName: "createAt"
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "100",
      slotName: "updateAt"
    },
    {
      label: "操作",
      minWidth: "80",
      slotName: "handler"
    }
  ],

  showIndexCloumn: false,
  showSelectCloumn: false,
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  },
  showFooter: false,

  rightTitle: "新建菜单"
}
