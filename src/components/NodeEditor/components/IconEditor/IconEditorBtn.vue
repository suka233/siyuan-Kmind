<template>
    <a-popover trigger="click">
        <template v-if="node" #content> <icon-editor /> </template>
        <a-button v-bind="$attrs" class="mr-2">
            <span class="align-middle">图标</span>
            <smile-outlined class="align-middle" /> </a-button
    ></a-popover>
</template>

<script lang="tsx">
export default {
    name: 'IconEditorBtn',
};
</script>

<script lang="tsx" setup>
import { SmileOutlined } from '@ant-design/icons-vue';
import IconEditor from './IconEditor.vue';
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
const publicStore = usePublicStore();
const { node } = toRefs(publicStore);
</script>

<style scoped></style>
