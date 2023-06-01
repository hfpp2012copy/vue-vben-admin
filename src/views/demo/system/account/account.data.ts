import { getAllRoleList } from '/@/api/demo/system';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    sorter: true,
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '所属部门',
    dataIndex: 'department',
    width: 120,
    customRender: ({ record }) => {
      const department = record.department;
      return department.depName;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      const createdAt = record.createdAt;
      return formatToDateTime(createdAt);
    },
  },
  {
    title: '角色',
    dataIndex: 'roles',
    width: 200,
    customRender: ({ record }) => {
      const roles = record.roles;
      return roles?.map((role) => role.name)?.join();
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: false,
    ifShow: true,
  },
  {
    label: '角色',
    field: 'roles',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      mode: 'multiple',
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'departmentId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'depName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },
];
