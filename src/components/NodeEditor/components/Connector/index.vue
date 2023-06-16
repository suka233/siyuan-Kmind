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
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
const publicStore = usePublicStore();
const { kmind } = toRefs(publicStore);

const handleCreateConnector = () => {
    kmind.value.associativeLine.createLineFromActiveNode();
};
</script>

<style scoped></style>
