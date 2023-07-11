<template>
    <a-button @click="handleCreateConnector">
        <span>关联线</span>
        <node-index-outlined class="align-middle" />
    </a-button>
</template>
<script lang="ts">
export default {
    name: 'Connector',
};
</script>
<script setup lang="ts">
import { NodeIndexOutlined } from '@ant-design/icons-vue';
import { kmind } from '/@/hooks/useKmind';

const handleCreateConnector = () => {
    kmind.associativeLine.createLineFromActiveNode();
};
</script>

<style scoped></style>
