<template>
    <a-select
        v-model:value="tagOptions"
        placeholder="请输入标签,回车添加"
        mode="tags"
        class="w-80 mr-2"
        :disabled="!node"
        :max-tag-count="2"
        :max-tag-text-length="5"
        @blur="kmind.renderer.endTextEdit()"
        @focus="kmind.renderer.startTextEdit()"
    />
</template>

<script lang="tsx">
export default {
    name: 'TagsEditor',
};
</script>

<script lang="tsx" setup>
import { computed } from 'vue';

const props = defineProps<{
    node: any;
    kmind: any;
}>();

// 计算tag的选项
const tagOptions = computed({
    get() {
        return props.node?.nodeData?.data.tag || [];
    },
    set(value) {
        props.node.setTag(value);
    },
});
</script>

<style scoped></style>
