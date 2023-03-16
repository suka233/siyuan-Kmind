<template>
    <a-modal v-model:visible="visible" title="超链接" @ok="handleOk">
        <div>
            <a-input
                v-model:value="link.url"
                addon-before="链接:"
                allow-clear
                placeholder="请输入链接地址"
            />
            <a-input
                v-model:value="link.name"
                addon-before="名称:"
                class="mt-2"
                allow-clear
                placeholder="请输入链接名称"
            />
        </div>
    </a-modal>
</template>

<script lang="tsx">
export default {
    name: 'HyperLinkEditor',
};
</script>
<script lang="tsx" setup>
import { computed, reactive, watch } from 'vue';

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
const link = reactive({
    url: '',
    name: '',
});

const handleOk = () => {
    props.node.setHyperlink(link.url, link.name);
};

// 回显
const init = () => {
    link.url = props.node.getData('hyperlink') ?? '';
    link.name = props.node.getData('hyperlinkTitle') ?? '';
};

watch(
    () => props.visible,
    (val) => {
        if (val) {
            init();
            props.kmind.renderer.startTextEdit();
        } else {
            props.kmind.renderer.endTextEdit();
        }
    },
);
</script>

<style scoped></style>
