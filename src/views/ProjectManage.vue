<template>
  <div>
    <div>
      <a-space wrap>
        <a-button type="primary" class="button-container">
          新建
          <PlusOutlined />
        </a-button>
      </a-space>
    </div>

    <div> 
      <a-divider style="border-color: #20211e" dashed />
    </div>

    <a-menu v-model:selectedKeys="current" mode="horizontal" :items="topNavItems" class="top-nav"/>

    <div class="card-container">
      <a-card v-for="(cardData, index) in cardList" :key="index" hoverable style="width: 240px" class="card">
        <template #cover>
          <img alt="example" :src="cardData.imageUrl" class="card-image" />
        </template>
        <a-card-meta>
          <template #title>
            <span v-if="!cardData.isRenaming">
              {{ cardData.title }}
            </span>
            <div v-else>
              <input v-model="cardData.title" @keyup.enter="finishRenaming(cardData)" @blur="finishRenaming(cardData)" />
            </div>
          </template>
          <template #description>{{ cardData.description }}</template>
        </a-card-meta>

        <div class="dropdown-container">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <span class="edit-button">编辑</span>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">删除</a>
                </a-menu-item>
                <a-menu-item>
                 <a href="javascript:;" @click="startRenaming(cardData)">重命名</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardList: [],
      current: ['allProjects'],
      topNavItems: [
        {
          key: 'allProjects',
          label: '全部项目', 
          title: '全部项目',
        },
        {
          key: 'recycleBin',
          label: '回收站',
          title: '回收站',
        }
      ], 
    };
  },
  methods: {
    startRenaming(cardData) {
      cardData.isRenaming = true;
    },
    finishRenaming(cardData) {
      cardData.isRenaming = false;
    }
  },
  mounted() {
    this.cardList = [
      {
        title: "Card 1",
        description: "Description for Card 1",
        imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        isRenaming:false
      },
      {
        title: "Card 2",
        description: "Description for Card 2",
        imageUrl: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
        isRenaming:false
      },
    ];
  }
};
</script>

<style>

.top-nav {
  margin-top:-20px;
}

.edit-button {
  font-size: 14px; 
}

.dropdown-container {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.button-container {
  margin-top: 20px;
  margin-left: 20px;
}

.title-container {
  margin-top: 20px;
  margin-left: 25px;
}

.card-container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.card {
  box-sizing: border-box;
}

.card-image {
  width: 240px; 
  height: 240px;
}
</style>
