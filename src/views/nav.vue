<template>
  <div class="mainContainer">
    <div class="nav-left-first" :style="navStyle">
      <div class="nav-left-f-header">
        <div class="avatar-container">
          <el-popover placement="right" width="300" trigger="click" :style="navStyle">
            <template #reference>
              <img src="../assets/imgs/1.jpg" alt="这是猫猫"/>
            </template>
            <el-card class="box-card" shadow="never" :style="navStyle">
              <template #header>
                <div class="card-header">
                  <div class="c-header-Content">
                    <span class="asFont">Mew</span>
                    <p class="additional-text">TeamId:{{teamID}}</p>
                  </div>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="账户管理"
                    placement="right"
                  >
                    <el-button class="button" text>
                      <el-icon color="#b1b3b8" size="40"><Avatar /></el-icon>
                    </el-button>
                  </el-tooltip>
                </div>
              </template>
              <el-menu
                class="el-menu-vertical-demo"
                collapse-transition="true"
                @open="handleOpen"
                @close="handleClose"
                :style="navStyle"
                style="border: none;"
              >
                <el-menu-item index="User" @click="$router.push('/nav/User')">
                  <span class="asFont">个人信息</span>
                </el-menu-item>
                <el-menu-item index="createTeam">
                  <span class="asFont">新建团队</span>
                </el-menu-item>
                <el-menu-item index="joinTeam" @click="dialogFormVisible = true">
                  <span class="asFont">加入团队</span>
                </el-menu-item>
                <!-- Form for joinTeam -->
                <el-dialog v-model="dialogFormVisible" title="请填写团队邀请码">
                  <el-form :model="form">
                    <el-form-item label="邀请码(必填)" :label-width="formLabelWidth">
                      <el-input v-model="form.Invite" autocomplete="off" />
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <el-row class="dialog-footer">
                      <el-col :span="12"><el-button @click="dialogFormVisible = false">取消</el-button></el-col>
                      <el-col :span="12"><el-button type="primary" @click="dialogFormVisible = false">确认</el-button></el-col>
                    </el-row>
                  </template>
                </el-dialog>

                <el-menu-item index="toggleTeam" @click="toggleTeam">
                  <span class="asFont">切换团队</span>
                </el-menu-item>
                <!-- Table for choose the Team -->
                <el-drawer v-model="visible" :show-close="false" direction="ltr">
                  <template #header="{ close, titleId, titleClass }">
                    <h4 :id="titleId" :class="titleClass">请选择你的团队！</h4>
                    <el-button type="danger" @click="close">
                      <el-icon class="el-icon--left" size="30"><CircleCloseFilled /></el-icon>
                    </el-button>
                  </template>
                    <el-table
                      ref="singleTableRef"
                      :data="TeamData"
                      highlight-current-row
                      style="width: 100%"
                      @current-change="chooseTeam"
                      empty-text="您似乎还没有加入团队哦"
                      align="center"
                    >
                      <!-- <el-table-column type="index" width="50" /> -->
                      <el-table-column property="name" label="我的团队" width="120" />
                  </el-table>
                </el-drawer>
                  <!-- <el-sub-menu index="0">
                    <template #title>
                      <span class="asFont">切换团队</span>
                    </template>
                      <el-menu-item index="toggleTeam" class="asFont">MewTeam</el-menu-item>
                  </el-sub-menu> -->

                <!-- <el-menu-item @click="toggleMenu">
                  <span class="asFont">切换主题</span>
                </el-menu-item> -->
                <el-menu-item @click="$router.push('/Login')">
                  <span class="asFont">退出登录</span>
                </el-menu-item>
              </el-menu>
            </el-card>
          </el-popover>
        </div>
      </div>
      <div class="nav-left-f-main">
        <el-menu v-if="currentMenu === 'light'"
          default-active="2"
          style="height: 100%;border:none;"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="$router.push('/nav/ProjectManage')">
            <div class="item-container">
              <el-icon><icon-menu /></el-icon>
              <span>项目管理</span>
            </div>
          </el-menu-item>
          <el-menu-item index="2">
            <div class="item-container">
              <el-icon><ChatDotSquare /></el-icon>
              <span>团队交流</span>
            </div>
          </el-menu-item>
          <el-menu-item index="3">
            <div class="item-container">
              <el-icon><Message /></el-icon>
              <span>消息中心</span>
            </div>
          </el-menu-item>
          <el-menu-item index="4">
            <div class="item-container" @click="$router.push('/nav/TeamManage')">
              <el-icon><setting /></el-icon>
              <span>团队管理</span>
            </div>
          </el-menu-item>
        </el-menu>
        <!-- <el-menu v-if="currentMenu==='dark'"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          style="height: 100%;border:none;"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <div class="item-container">
              <el-icon><icon-menu /></el-icon>
              <span>项目管理</span>
            </div>
          </el-menu-item>
          <el-menu-item index="2">
            <div class="item-container">
              <el-icon><document /></el-icon>
              <span>团队交流</span>
            </div>
          </el-menu-item>
          <el-menu-item index="3">
            <div class="item-container">
              <el-icon><Message /></el-icon>
              <span>消息中心</span>
            </div>
          </el-menu-item>
          <el-menu-item index="4">
            <div class="item-container">
              <el-icon><setting /></el-icon>
              <span>团队管理</span>
            </div>
          </el-menu-item>
        </el-menu> -->
      </div>
      <div class="nav-left-f-footer">
        <!-- <el-icon><BottomLeft /></el-icon> -->
      </div>
    </div>
    <div class="mainContent">
      <RouterView></RouterView>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {  BottomLeft,  Menu as IconMenu,  ChatDotSquare,  Setting ,Message,Avatar} from '@element-plus/icons-vue'
import {ref,reactive} from 'vue'
import { message } from 'ant-design-vue';
import { ElButton, ElDrawer, ElTable} from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import  axios  from 'axios';

interface Team {
  name : string
}
const TeamData: Team[] =[]

const userData = {
  username: 'Mew',
  personalInfo: '个人信息',
};

const token = "ZXlKMGVYQmxJam9pU2xkVUlpd2lZV3huSWpvaVpHVm1ZWFZzZENKOToxcVpOb006WEdsbjRTM0taRmljeUthQUdxMUZDNHpkTVJjb3B5NTRUUldxT3ZMaEJlbw.ZXlKcFpDSTZNeXdpYVdGMElqb3hOamt5T1RNMU16RTRMalF6T1RjeE5URXNJbVY0Y0NJNk1UWTVOREUwTkRreE9DNDBNemszTVRVeGZROjFxWk5vTTotbllRRTM0MzRKd3JfcnRPMFdXY1ZKQVgxbm9LTHZWWkh4T0ZLa3NZbGxj.0b55cdc4057f58fbe4ef185708f3ec6f"

const teamID = ref("1145141919810")
const visible = ref(false)
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()
const form = reactive({
  Invite:"",
})


const currentMenu = ref('light')
// const cur_nav = ref('light')
const navStyle = ref({
  backgroundColor:"#FFFFFF",
  textColor:"#fff",
  activeTextColor:"#ffd04b",
})
const chooseTeam = (val:Team | undefined)=>{
  currentRow.value = val;
}
const toggleTeam = ()=>{
  visible.value=true;
  axios.get('/api/team/user/teams/',{
      headers: {
          'Authorization': token,
      }
    }
  ).then(function(res){
    console.log(JSON.stringify(res.data));
    TeamData.values=res.data;
  }).catch((e)=>{
    console.error(e);
  })
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// const toggleMenu = ()=>{
//   currentMenu.value = (currentMenu.value === 'light' ? 'dark' : 'light');
//   cur_nav.value = (cur_nav.value === 'light' ? 'dark' : 'light');
//   if(cur_nav.value==='light'){
//     navStyle.value.backgroundColor="#FFFFFF"
//     navStyle.value.textColor="#fff"
//     navStyle.value.activeTextColor="#ffd04b"
//   }else{
//     navStyle.value.backgroundColor="#545c64"
//     navStyle.value.textColor="#fff"
//     navStyle.value.activeTextColor="#333"
//   }
// }
</script>


<style scoped>
.mainContainer{
  display: flex;
}
.mainContent{
  flex: 100;
}
.nav-left-first {
  width: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e0e0e0;
}
.nav-left-f-header {
  height: 15%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.nav-left-f-main {
  height: 80%;
}
.nav-left-f-footer {
  height: 5%;
}

.avatar-container {
  width: 80px;
  height: 80px;
  border-radius: 50%; /* 圆形边框 */
  border: 2px solid #e0e0e0; /* 边框样式 */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  overflow: hidden; /* 裁剪溢出的内容 */
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片自适应 */
}
.item-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  height: 50px;
}
.el-menu-item {
  height: 90px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  border: none !important;
  box-shadow: none !important;
}
.card-header {
  height: 60px;
}
.card-content{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%; /* 使内容撑满卡片高度 */
}
.asFont{
  font-family: Arial, sans-serif;
  font-size: 16px; 
}
.dialog-footer{
  text-align: center;
}
.c-header-Content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.additional-text {
  margin-top: 2px; /* 调整间距 */
  font-size: 3px; /* 调整字体大小 */
  color: #7a6b6b; /* 调整字体颜色 */
}
</style>
