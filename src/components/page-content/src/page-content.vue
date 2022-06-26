<template>
  <div class="content">
    <xt-table
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
      v-bind="contentTableConfig"
      @handleSelectChange="handleSelectChange"
    >
      <template #headlerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">{{
          contentTableConfig.rightTitle
        }}</el-button>
        <el-button v-if="isQuery" text size="small"
          ><el-icon><Loading /></el-icon
        ></el-button>
      </template>
      <!-- 固定插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">{{
        $filters.formatTime(scope.row.createAt)
      }}</template>
      <template #updateAt="scope">{{
        $filters.formatTime(scope.row.updateAt)
      }}</template>
      <template #handler="scope">
        <el-button
          text
          v-if="isUpdate"
          size="small"
          type="primary"
          @click="handleEditClick(scope.row)"
          >编辑</el-button
        >
        <el-button
          text
          v-if="isDelete"
          size="small"
          style="color: red"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        >
      </template>

      <!-- 使用组件传递来的动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </xt-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import { useStore } from "vuex"
import XtTable from "@/base-ui/table"
import { usePermissions } from "@/hook/usePermissions"

export default defineComponent({
  components: {
    XtTable
  },
  props: {
    contentTableConfig: {
      type: Object
    },
    pageName: {
      type: String,
      default: ""
    }
  },
  emits: ["handleNewClick", "handleEditClick"],
  setup(props, { emit }) {
    const store = useStore()
    // 获取操作权限
    const isCreate = usePermissions(props.pageName, "create")
    const isUpdate = usePermissions(props.pageName, "update")
    const isDelete = usePermissions(props.pageName, "delete")
    const isQuery = usePermissions(props.pageName, "query")
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    // 监听分页条件变化请求数据
    watch(pageInfo, () => getPageData())

    const getPageData = (formData: any = {}) => {
      if (!isQuery) return
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...formData
        }
      })
    }
    getPageData()
    // 获取对应vuex数据
    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters["system/pageCountData"](props.pageName)
    )

    // 多选的数据
    const handleSelectChange = (value: any) => {
      console.log(value)
    }
    // 获取组件剩余插槽,过滤掉剩余插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false
        if (item.slotName === "createAt") return false
        if (item.slotName === "updateAt") return false
        if (item.slotName === "handler") return false
        return true
      }
    )

    // 删除某一行
    const handleDeleteClick = (item: any) => {
      console.log(item)
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleNewClick = () => {
      emit("handleNewClick")
    }
    const handleEditClick = (item: any) => {
      emit("handleEditClick", item)
    }

    return {
      handleSelectChange,
      dataList,
      dataCount,
      pageInfo,
      isQuery,
      isCreate,
      isUpdate,
      isDelete,
      otherPropSlots,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 20px 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
