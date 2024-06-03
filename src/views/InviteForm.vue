<template>
    <div>
        <a-button type="primary" class="invite-button" @click="showModal">
            邀请成员
        </a-button>
        <a-modal title="Title" v-model:open="open" :confirm-loading="confirmLoading" @ok="handleOk">
            <p>{{ modalText }}</p>
        </a-modal>
    </div>
</template>

<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
    setup() {
        const modalText = ref('Content of the modal');
        const open = ref(false);
        const confirmLoading = ref(false);
        const showModal = () => {
            open.value = true;
        };
        const handleOk = () => {
            modalText.value = 'The modal will be closed after two seconds';
            confirmLoading.value = true;
            setTimeout(() => {
                open.value = false;
                confirmLoading.value = false;
            }, 2000);
        };
        return {
            modalText,
            open,
            confirmLoading,
            showModal,
            handleOk,
        };
    },
});
</script>

<style>
.invite-button {
    float: right;
    margin-top: -32px;
}
</style>