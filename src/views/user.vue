<template>
  <div class="outContainer">
    <div></div>
  <nav></nav>
    <div class="container">
      <el-upload
      class="avatar-uploader"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  
      <el-descriptions :column="1" border class="information">
  
        <el-descriptions-item label="用户名" class="left-content">
          <div class="input-container">
            <el-input class="message" v-model="username" v-show="ifedit1">{{username}}</el-input>
            <span class="unedit" v-show="!ifedit1">{{username}}</span>
            <div class="button-container">
              <el-button @click="ifedit1 = !ifedit1">{{ ifedit1 ? '确定' : '编辑' }}</el-button>
            </div>
          </div>
        </el-descriptions-item>
  
        <el-descriptions-item label="邮箱号" class="left-content">
          <div class="input-container">
            <el-input class="message" v-model="email" v-show="ifedit2">{{email}}</el-input>
            <span class="unedit" v-show="!ifedit2">{{email}}</span>
            <div class="button-container">
              <el-button @click="ifedit2 = !ifedit2">{{ ifedit2 ? '确定' : '编辑' }}</el-button>
            </div>
          </div>
        </el-descriptions-item>
  
        <el-descriptions-item label="真实姓名" class="left-content">
          <div class="input-container">
            <el-input class="message" v-model="realName" v-show="ifedit3">{{realName}}</el-input>
            <span class="unedit" v-show="!ifedit3">{{realName}}</span>
            <div class="button-container">
              <el-button @click="ifedit3 = !ifedit3">{{ ifedit3 ? '确定' : '编辑' }}</el-button>
            </div>
          </div>
        </el-descriptions-item>
  
        <el-descriptions-item label="居住地" class="left-content">
          <div class="input-container">
            <el-input class="message" v-model="city" v-show="ifedit4">{{city}}</el-input>
            <span class="unedit" v-show="!ifedit4">{{city}}</span>
            <div class="button-container">
              <el-button @click="ifedit4 = !ifedit4">{{ ifedit4 ? '确定' : '编辑' }}</el-button>
            </div>
          </div>
        </el-descriptions-item>
  
      </el-descriptions>
    </div>
  </div>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import type { UploadProps } from 'element-plus'

  const imageUrl = ref('https://img0.baidu.com/it/u=1902068963,1187553949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(imageUrl.value)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
    let ifedit1=false
    let ifedit2=false
    let ifedit3=false
    let ifedit4=false
    let username= "123445"
    let email= "1805166855@qq.com"
    let city="北京"
    let realName=13577718517

</script>
  
  <style scoped>
  .outContainer{
    height: 100%;
    width: 100%;
    margin-top: 0px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .avatar-uploader .avatar {
    width: 100px;
    display: block;
    border-radius: 100%;
  }
  .unedit {
    width: 100px;
  }
  
  .message {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100px;
  }
  
  .container {
    width: 70%;
    height: 70%;
    margin-top: 100px;
    margin-left: 300px;
  }
  
  .information {
    margin-top: 0;
  }
  
  .input-container {
    display: flex;
    justify-content: space-between;
  }
  
  .button-container {
    margin-left: 10px;
  }
  
  .left-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 50px; /* 指定一个固定的宽度 */
  }
  </style>