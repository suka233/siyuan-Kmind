<template>
    <div class="side-bar-container">
        <close-outlined class="close-button" @click="setActiveSidebar('')" />
        <div v-if="$slots.title" class="side-bar-header">
            <slot name="title"></slot>
        </div>
        <div v-else class="side-bar-header">
            {{ title }}
        </div>
        <div class="side-bar-content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'SideBar',
};
</script>

<script lang="tsx" setup>
import { CloseOutlined } from '@ant-design/icons-vue';
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { setActiveSidebar } = publicStore;

defineProps<{
    title?: string;
}>();
</script>

<style scoped lang="less">
.side-bar-container {
    @apply fixed top-20;
    left: -280px;
    width: 280px;
    bottom: 0;
    background-color: #fff;
    border-left: 1px solid #e8e8e8;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
    overflow: auto;

    &.show {
        left: 20px;
    }

    .close-button {
        @apply top-3;
        position: absolute;
        right: 20px;
        font-size: 16px;
        cursor: pointer;
    }

    .side-bar-header {
        width: 100%;
        height: 44px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-grow: 0;
        flex-shrink: 0;
    }

    .side-bar-content {
        @apply p-2;
        width: 100%;
        height: 100%;
        overflow: auto;
    }
}
</style>
