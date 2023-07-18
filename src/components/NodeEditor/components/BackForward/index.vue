<template>
    <a-button
        :disabled="backEnd"
        class="mr-2"
        title="回退（撤销）"
        @click="handleBack"
    >
        <rollback-outlined class="align-middle" />
    </a-button>
    <a-button
        :disabled="forwardEnd"
        class="mr-2"
        title="前进（取消撤销）"
        @click="handleForward"
        ><rollback-outlined
            class="align-middle"
            style="transform: rotateY(180deg)"
    /></a-button>
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
import { kmind } from '/@/hooks/useKmind';
const publicStore = usePublicStore();
const { backEnd, forwardEnd } = toRefs(publicStore);

const handleBack = () => {
    kmind.execCommand('BACK');
};

const handleForward = () => {
    kmind.execCommand('FORWARD');
};
</script>

<style scoped></style>
