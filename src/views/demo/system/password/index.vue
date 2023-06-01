<template>
  <PageWrapper title="修改当前用户密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center">
      <BasicForm @register="register" />
      <div class="flex justify-center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';

  import { formSchema } from './pwd.data';
  import { changePassword } from '/@/api/demo/system';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStoreWithOut } from '/@/store/modules/user';

  export default defineComponent({
    name: 'ChangePassword',
    components: { BasicForm, PageWrapper },
    setup() {
      const [register, { validate, resetFields }] = useForm({
        size: 'large',
        baseColProps: { span: 24 },
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      const { createMessage } = useMessage();
      const userStore = useUserStoreWithOut();

      async function handleSubmit() {
        try {
          const values = await validate();
          const { passwordOld, passwordNew } = values;

          // TODO custom api
          console.log(passwordOld, passwordNew);

          await changePassword(passwordOld, passwordNew);
          createMessage.success('修改成功');
          userStore.logout(true);
          // const { router } = useRouter();
          // router.push(pageEnum.BASE_LOGIN);
        } catch (error: any) {
          if (error?.errorFields) return;

          createMessage.error(error?.response?.data?.message);
        }
      }

      return { register, resetFields, handleSubmit };
    },
  });
</script>
