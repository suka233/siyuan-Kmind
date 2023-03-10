<template>
    <a-button>
        <span class="align-middle">导出</span>
        <upload-outlined class="align-middle" />
    </a-button>
</template>

<script lang="tsx">
export default {
    name: 'ExportFileBtn',
};
</script>

<script lang="tsx" setup>
import { UploadOutlined } from '@ant-design/icons-vue';
</script>

<style scoped></style>
