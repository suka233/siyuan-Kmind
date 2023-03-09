<template>
    <a-modal v-model:visible="visible" title="标签" @ok="handleOk">
        <a-select
            v-model:value="tagOptions"
            placeholder="请输入标签,回车添加"
            mode="tags"
            class="w-full"
            :max-tag-text-length="5"
    /></a-modal>
</template>

<script lang="tsx">
export default {
    name: 'TagsEditor',
};
</script>

<script lang="tsx" setup>
import { computed, ref, watch } from 'vue';
import { message } from 'ant-design-vue';

const props = defineProps<{
    visible: boolean;
    node: any;
    kmind: any;
}>();
const emits = defineEmits<{
    (event: 'update:visible', visible: boolean): void;
}>();
const visible = computed({
    get() {
        return props.visible;
    },
    set() {
        emits('update:visible', !visible.value);
    },
});
// 计算tag的选项
// const tagOptions = computed({
//     get() {
//         return props.node?.nodeData?.data.tag || [];
//     },
//     set(value) {
//         props.node.setTag(value);
//     },
// });
const tagOptions = ref(props.node?.nodeData?.data.tag || []);

watch(
    () => props.visible,
    (val) => {
        if (val) {
            props.kmind.renderer.startTextEdit();
        } else {
            props.kmind.renderer.endTextEdit();
        }
    },
);
const handleOk = () => {
    if (tagOptions.value.length > 5) {
        message.error('标签最多只能添加5个,多余的将被舍弃掉~');
        return;
    }
    props.node.setTag(tagOptions.value);
    visible.value = false;
};
</script>

<style scoped></style>
