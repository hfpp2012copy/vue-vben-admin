<template>
  <PageWrapper
    :title="`角色` + roleId + `的资料`"
    content="这是角色资料详情页面。本页面仅用于演示相同路由在tab中打开多个页面并且显示不同的数据"
    contentBackground
    @back="goBack"
  >
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="角色资料" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'detail'">
        <div v-for="i in 10" :key="i">这是角色{{ roleId }}资料Tab</div>
      </template>
      <ul>
        <li v-for="item in role?.permissions" :key="item.id">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </PageWrapper>
</template>

<script>
  import { defineComponent, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs } from 'ant-design-vue';
  import { getRoleById } from '/@/api/demo/system';

  export default defineComponent({
    name: 'AccountDetail',
    components: { PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到角色ID
      const roleId = ref(route.params?.id);
      const currentKey = ref('detail');
      const { setTitle } = useTabs();
      // TODO
      // 本页代码仅作演示，实际应当通过roleId从接口获得角色的相关资料

      // 设置Tab的标题（不会影响页面标题）
      setTitle('详情：角色' + roleId.value);

      const role = ref(null);

      onMounted(async () => {
        role.value = await getRoleById(roleId.value);
      });

      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/system/role');
      }
      return { roleId, currentKey, goBack, role };
    },
  });
</script>

<style></style>
