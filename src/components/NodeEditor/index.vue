<template>
    <a-card
        hoverable
        :class="`w-200 animate-animated animate-slideInDown`"
        size="small"
    >
        <div class="">
            <span
                v-if="node"
                class="w-15 truncate mr-2 inline-block align-middle"
                >{{ node?.nodeData?.data.text }}</span
            >
            <span
                v-else
                class="w-15 truncate mr-2 inline-block align-middle text-gray-300"
                >未选择节点</span
            >
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
            <a-button class="mr-2" @click="showLinkEditor = !showLinkEditor">
                超链接
                <link-outlined />
            </a-button>
            <a-button class="mr-2" @click="showVditor = !showVditor">
                备注
                <file-text-outlined></file-text-outlined>
            </a-button>
            <a-button @click="showVditor = !showVditor">
                图片
                <picture-outlined></picture-outlined>
            </a-button>
        </div>
        <div>
            <div v-show="showVditor" id="vditor" class="mt-2"></div>
            <div v-show="showLinkEditor" class="mt-2">
                <a-input addon-before="链接:" allow-clear></a-input>
                <a-input
                    addon-before="名称:"
                    class="mt-2"
                    allow-clear
                ></a-input>
            </div>
        </div>
    </a-card>
</template>

<script lang="tsx">
/**
 * 节点编辑
 */
export default {
    name: 'NodeEditor',
};
</script>
<script setup lang="tsx">
import { computed, onMounted, ref } from 'vue';
import {
    FileTextOutlined,
    LinkOutlined,
    PictureOutlined,
} from '@ant-design/icons-vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const vditor = ref<Vditor | null>(null);
const showVditor = ref(false);
const showLinkEditor = ref(false);
const cardHeight = ref(16);
const props = defineProps<{
    node: any;
    kmind: any;
}>();

onMounted(() => {
    vditor.value = new Vditor('vditor', {
        minHeight: 280,
        focus(value: string) {
            props.kmind.renderer.startTextEdit();
        },
        blur(value: string) {
            props.kmind.renderer.endTextEdit();
        },
    });
});

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

<style>
.editor-card {
    transition: all 2s linear;
}
</style>
