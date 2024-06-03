<template>
  <a-table :columns="columns" :data-source="data">
    <template #title >
      <strong style="font-size: 24px;">
        成员
      </strong>

      <invite-form></invite-form>
      
    </template>

    <template #headerCell="{ column }">
      <template v-if="column.key === 'username'">
        <span>
          <smile-outlined />
          昵称
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'username'">
        <a>
          {{ record.username }}
        </a>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              ...
            </a>
            <template #overlay>
              <a-menu v-if="currentRole === '创建者' && record.identity === '成员'"  >
                <a-menu-item>
                  <a href="javascript:;">设置为管理员</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">移出团队</a>
                </a-menu-item>
              </a-menu>

              <a-menu v-else-if="currentRole === '创建者' && record.identity === '管理员'"  >
                <a-menu-item>
                  <a href="javascript:;">取消管理员</a>
                </a-menu-item>
              </a-menu>

              <a-menu v-else-if="currentRole === '管理员' && record.identity === '成员'"  >
                <a-menu-item @click="setAsAdmin(record.key)">
                  <a href="javascript:;">设置为管理员</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">移出团队</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script>
import axios from 'axios';
import InviteForm from './InviteForm.vue';

export default {
  components: {
    InviteForm
  },
  data() {
    return {
      columns: [
        {
          name: 'username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '真实姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '身份',
          key: 'identity',
          dataIndex: 'identity',
        },
        {
          title: '操作',
          key: 'action',
        },
      ],
      data: [
        {
          key: '1',
          username:'A',
          name: '王资深',
          email:'10086@qq.com',
          identity: '成员',
        },
        {
          key: '2',
          username:'B',
          name: '王资深',
          email:'10086@qq.com',
          identity: '创建者',
        },
        {
          key: '3',
          username:'C',
          name: '王资深',
          email:'10086@qq.com',
          identity: '管理员',
        },
      ],
      currentRole: '管理员',
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get('')
        .then(response => {
          this.data = response.data;
        })
        .catch(error => {
          console.error('Error getting data:', error);
        });
    },
    setAsAdmin(key) {
      const member = this.data.find(item => item.key === key);
      if (member && member.identity === '成员') {
        member.identity = '管理员';
      }
    },
  }
};
</script>

