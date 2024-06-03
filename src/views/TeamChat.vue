<template>
    <n-layout>
        <n-drawer v-model:show="active" :width="502" :placement="placement">
            <n-drawer-content title="群成员">
                <n-button tertiary round type="info" v-show="isAdmin" @click="atAll()">
                    @全体成员
                </n-button>
                <n-list hoverable clickable>
                    <n-list-item v-for="(item, index) in msgs" :key='index'>
                        <n-thing content-style="margin-top: 10px;" @click="atuser(item)">
                            <template #description>
                                <n-space size="small" style="margin-top: 4px">
                                    <n-tag :bordered="false" type="info" size="small">
                                        团队成员
                                    </n-tag>
                                    {{ item.userName }}
                                </n-space>
                            </template>
                        </n-thing>
                    </n-list-item>
                </n-list>
            </n-drawer-content>
        </n-drawer>

        <n-layout-header>
            <n-avatar-group :options="options" :size="40" :max="3" @click="activate('left')" />
            <span style="line-height: 60px;margin-left: 20px;font-size: 18px">
                群名
            </span>
            <span style="line-height: 60px;margin-left: 20px;font-size: 12px;color: var(--greyFont)">
                当前在线人数：{{ options.length }}
            </span>

        </n-layout-header>

        <n-layout-content content-style="padding: 24px;" style="height: 400px">
            <div class="msg-container">
                <div v-for="(item, index) in msgs"
                    :class="['msg-one', item.userName === '我' ? 'message-right' : 'message-left']" :key="index">
                    <!-- 头像 -->
                    <div>
                        <n-avatar object-fit="cover" :size="40" style="cursor: pointer " round @click="atuser(item)">{{
                            item.userName }}</n-avatar>
                    </div>
                    <!-- 文本消息 -->
                    <div class="msg-user">{{ item.userName }}</div>

                    <div class="message" v-html="item.content" :style="'background'">
                    </div>


                    <!-- 时间 -->
                    <!--<div class="msg-date" style="margin-left: 5px;margin-right: 5px" v-if="!$common.isEmpty(item.createTime)">
                    {{ $common.getDateDiff(item.createTime) }}
                </div>-->
                </div>
            </div>
        </n-layout-content>

        <n-layout-footer style="height: 220px">
            <!-- 功能栏 -->
            <div style="padding: 10px 15px;display: flex;height: 25px">
                <!-- 表情 -->
                <n-popover placement="top-start" display-directive="show" trigger="click">
                    <template #trigger>
                        <div class="myEmoji">
                            <svg viewBox="0 0 1024 1024" width="25" height="25">
                                <path d="M523.9 511.98m-419.5 0a419.5 419.5 0 1 0 839 0 419.5 419.5 0 1 0-839 0Z"
                                    fill="#FFD629"></path>
                                <path
                                    d="M885.2 298.58c-1.6-0.6 37.1 68.4 49.5 128.9 46.4 227-99.9 448.6-326.9 495.1-37.9 7.8-75.7 10.1-112.5 7.7-63.2-4.2-123.6-22.8-177.3-53 0 0 348.9-269.7 567.2-578.7z"
                                    fill="#FF9A2C" opacity=".1"></path>
                                <path
                                    d="M922.4 383.38c73.9 216.8-52.8 456-264 525.8-36.7 12.1-108.5 28.3-184.9 19.4 0-0.5 166.62-15.7 313.54-190.74C942.88 552.16 920.2 376.98 922.4 383.38z"
                                    fill="#FF9A2C" opacity=".2"></path>
                                <path
                                    d="M790 184.48c-40.9-34.6-93.6-59.3-155.8-77.3-95.5-27.6-199.4-17.7-300.6 31.5-139.3 67.7-240.1 245.9-227.6 400.2 4.2 52 10.1 101.8 30 145.5 0.5 1 1.6 1.5 2.7 1.2 21.1-6.8 218.8-73.6 375.8-190.3 213.3-158.5 292.3-296.6 275.5-310.8z"
                                    fill="#FCE99A" opacity=".24"></path>
                                <path
                                    d="M188.008782 408.574552a136 234.3 54.429 1 0 381.157036-272.589938 136 234.3 54.429 1 0-381.157036 272.589938Z"
                                    fill="#F9F2D7" opacity=".2"></path>
                                <path d="M616.9 326.38m-52.7 0a52.7 52.7 0 1 0 105.4 0 52.7 52.7 0 1 0-105.4 0Z"
                                    fill="#211715"></path>
                                <path
                                    d="M381.7 438.38l-77.6 125.3-15.5-8c-16-8.2-22.3-27.9-14.1-43.9l26.2-47.3-45.6-19.6c-15.7-8.1-21.9-27.4-13.8-43.1l8.2-16 132.2 52.6z"
                                    fill="#211715"></path>
                                <path
                                    d="M603 479.68c27.4 56.5 14.1 119.5-29.7 140.8s-101.6-7.2-129-63.7l30.6-8c37.4-9.7 72.1-26.6 102.9-50l25.2-19.1z"
                                    fill="#F94616"></path>
                                <path
                                    d="M514.5 567.38l8.8 6c3.6 2.5 8.3 2.8 12.2 0.7l26.9-14c3.4-1.8 5.7-5.1 6.3-8.9l1.5-10.5c1.4-10-9.4-17.1-18-11.9-9.1 5.5-20.9 11.8-35.4 17.7-8.8 3.6-10.1 15.5-2.3 20.9z"
                                    fill="#E53600" opacity=".68"></path>
                                <path
                                    d="M922.4 383.38c73.9 216.8-52.8 456-264 525.8-36.7 12.1-108.5 28.3-184.9 19.4 0-0.5 122.92-45.83 275.21-216.29C910.21 531.51 920.2 376.98 922.4 383.38z"
                                    fill="#FF9A2C" opacity=".19"></path>
                                <path
                                    d="M922.4 383.38c73.9 216.8-52.8 456-264 525.8-36.7 12.1-108.5 28.3-184.9 19.4 0-0.5 89.92-84.69 242.21-255.15C877.21 492.65 920.2 376.98 922.4 383.38z"
                                    fill="#FF9A2C" opacity=".15"></path>
                            </svg>
                        </div>
                    </template>
                    <!-- 表情 -->
                    <emoji @addEmoji="addEmoji" :showEmoji="true"></emoji>
                </n-popover>

            </div>

            <textarea @keydown="send($event)" v-model="msg" maxlength="1000" spellcheck="false" class="message-content"
                style="margin: 15px 5px">
            </textarea>
            <!-- 发送 -->
            <div class="message-send">
                <span style="color: var(--greyFont);margin-right: 15px;font-size: 12px">Ctrl+Enter：换行 | Enter：发送</span>
                <n-button @click="doSend()" type="info">
                    发送
                </n-button>
            </div>
        </n-layout-footer>
    </n-layout>
</template>
  
<script>

import { useDialog } from 'naive-ui';

import { nextTick, ref } from 'vue';

import { ElMessage } from "element-plus";
import { CashOutline as CashIcon } from "@vicons/ionicons5";
import { defineComponent, reactive, getCurrentInstance, onMounted, onBeforeUnmount, watchEffect, toRefs } from 'vue';
import emoji from "./emoji.vue"
export default {
    components: {
        CashIcon,
        emoji
    },

    setup(props, context) {
        //用于弹出群成员抽屉
        const active = ref(false);
        const placement = ref("right");
        const activate = (place) => {
            active.value = true;
            placement.value = place;
        };
        //实时聊天
        const chatSocket = new WebSocket(
            'ws://'
            + '101.43.215.188:8001'
            + '/ws/chat/'
            + '1'
            + '/?token='
        );

        document.querySelector('#chat-message-submit').onclick = function(e) {
            const messageInputDom = document.querySelector('#chat-message-input');
            const message = messageInputDom.value;
            chatSocket.send(JSON.stringify({
                'message': message
            }));
            messageInputDom.value = '';
        };
        const isAdmin = ref(true)
        //成员列表
        let persons = reactive([])
        //消息列表
        let msgs = reactive([
            {
                userName: '王',
                content: '666'
            }, {
                userName: '我',
                content: '777'
            }, {
                userName: '王',
                content: '666'
            }, {
                userName: '我',
                content: '777'
            }, {
                userName: '王',
                content: '666'
            }, {
                userName: '我',
                content: '777'
            }, {
                userName: '王',
                content: '666'
            }, {
                userName: '我',
                content: '777'
            }, {
                userName: '王',
                content: '666'
            }, {
                userName: '我',
                content: '777'
            }, {
                userName: '王',
                content: '666'
            }, {
                userName: '我',
                content: '777'
            },
        ])
        let msg = ref("请输入信息")
        //@某个成员
        function atuser(user) {
            if (user.userName !== '我') {
                active.value = false
                msg.value = msg.value + ` @${user.userName} `
            }

        }

        //@全部
        function atAll() {
            active.value = false
            msg.value = msg.value + ' @_All '
        }
        function addEmoji(key) {
            data.msg += key;
        }

        function doSend(){

        }

        onMounted(()=>{

        })
        return {
            isAdmin,
            active,
            placement,
            activate,
            msgs,
            msg,
            persons,
            options: [
                {
                    name: "张三",
                    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                },
                {
                    name: "李四",
                    src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                },
                {
                    name: "王五",
                    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                },
                {
                    name: "赵六",
                    src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                },
                {
                    name: "七仔",
                    src: "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                }
            ],
            atuser,
            atAll,
            addEmoji,
            doSend
        }
    }
}
</script>
  
<style scoped>
.n-layout-header {
    background: rgba(128, 128, 128, 0.4);
    padding: 24px;

}

.n-layout-footer {
    background: rgba(128, 128, 128, 0.4);
    padding: 5px 24px 24px 24px;

}

.n-layout-sider {
    background: rgba(128, 128, 128, 0.3);
}

.n-layout-content {
    background: rgba(128, 128, 128, 0.2);
}

.msg-one {
    margin: 15px 20px;
    display: flex;
    align-items: flex-start;
}

.msg-date,
.msg-user {
    font-size: 12px;
    color: var(--greyFont);
}

.message {
    max-width: 50%;
    padding: 5px 10px;
    line-height: 25px;
    word-break: break-all;
    position: relative;
    color: var(--black);
    margin: 0 12px 0 12px;
}

.message::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 3px solid;
    top: 0;
}

.message-left .message {
    background-color: var(--white);
    border-radius: 0 4px 4px 4px;
}

.message-left .message::before {
    left: -6px;
    border-color: var(--white) var(--white) transparent transparent;
}

.message-right {
    flex-direction: row-reverse;
}

.message-right .message {
    background-color: var(--messageColor);
    border-radius: 4px 0 4px 4px;
}

.message-right .message::before {
    right: -6px;
    border-color: var(--messageColor) transparent transparent var(--messageColor);
}

.message-content {
    width: calc(100% - 30px);
    margin: 0 15px;
    box-sizing: border-box;
    height: calc(100% - 100px);
    display: block;
    border: none;
    outline: none;
    box-shadow: none;
    resize: none;
    font-size: 18px;
}

.message-send {
    float: right;
    padding: 10px 30px 15px;
}

.message-send .n-button {
    height: 30px;
    padding: 10px 25px;
}

.msg-container {
    background: var(--midWhite);
    overflow-y: scroll;
    height: calc(100% - 25px);
}
</style>
  