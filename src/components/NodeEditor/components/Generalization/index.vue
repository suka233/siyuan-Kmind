<template>
    <a-button title="根节点无概要" @click="handleClick">
        <span class="align-middle">概要</span>
        <partition-outlined
            class="align-middle"
            style="transform: rotateY(180deg)"
        ></partition-outlined>
    </a-button>
</template>

<script lang="tsx">
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Generalization',
};
</script>

<script lang="tsx" setup>
import { PartitionOutlined } from '@ant-design/icons-vue';
const props = defineProps<{
    kmind: any;
}>();

const handleClick = () => {
    props.kmind.execCommand('ADD_GENERALIZATION');
};
</script>

<style scoped></style>
