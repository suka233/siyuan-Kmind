<template>
    <a-button
        :disabled="backEnd"
        class="mr-2"
        title="回退（撤销）"
        @click="handleBack"
    >
        <rollback-outlined class="align-middle"></rollback-outlined>
    </a-button>
    <a-button
        :disabled="forwardEnd"
        class="mr-2"
        title="前进（取消撤销）"
        @click="handleForward"
        ><rollback-outlined
            class="align-middle"
            style="transform: rotateY(180deg)"
        ></rollback-outlined
    ></a-button>
</template>

<script lang="tsx">
export default {
    name: 'BackForward',
};
</script>

<script lang="tsx" setup>
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
import { RollbackOutlined } from '@ant-design/icons-vue';
const publicStore = usePublicStore();
const { backEnd, forwardEnd, kmind } = toRefs(publicStore);

const handleBack = () => {
    kmind.value.execCommand('BACK');
};

const handleForward = () => {
    kmind.value.execCommand('FORWARD');
};
</script>

<style scoped></style>
