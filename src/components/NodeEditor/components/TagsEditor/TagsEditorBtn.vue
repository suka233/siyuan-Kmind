<template>
    <a-button>
        <span class="align-middle">标签</span>
        <tags-outlined class="align-middle" />
    </a-button>
</template>

<script lang="tsx">
export default {
    name: 'TagsEditorBtn',
};
</script>
<script lang="tsx" setup>
import { TagsOutlined } from '@ant-design/icons-vue';
</script>

<style scoped></style>
