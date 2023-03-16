<template>
    <a-modal v-model:visible="visible" title="插入图片" @ok="handleOk">
        <a-upload-dragger
            :file-list="picFile"
            list-type="picture-card"
            :before-upload="handlePicBeforeUpload"
            @change="handlePicUpload"
        >
            <img v-if="picUrl" ref="img" :src="computedPicUrl" alt="pic" />

            <div v-else>
                <loading-outlined v-if="picLoading" />
                <file-image-two-tone v-else class="text-4xl mb-4" />
                <p>点击或者拖拽到此区域上传图片</p>
                <p class="text-gray-500/80">
                    注意：图片会默认保存在思源的/assets/目录下，一旦上传图片，只能手动去目录下删除图片资源，或者使用思源笔记的
                    设置-资源 来管理所有未引用资源
                </p>
            </div>
        </a-upload-dragger>
        <a-input
            v-model:value="computedPicUrl"
            addon-before="图片链接地址:"
            class="mt-2"
            allow-clear
            placeholder="支持手动输入图片地址"
        />
        <div class="mt-2">
            <a-input-number
                v-model:value="picWidth"
                addon-before="图片宽度:"
                addon-after="px"
                :min="0"
                :max="1000"
                :step="10"
                placeholder="设置图片宽度"
                class="w-1/2"
            />
            <a-input-number
                v-model:value="picHeight"
                addon-before="图片高度:"
                addon-after="px"
                :min="0"
                :max="1000"
                :step="10"
                placeholder="设置图片高度"
                class="w-1/2"
            />
        </div>

        <div class="mt-2">
            <a-input
                v-model:value="picTitle"
                addon-before="图片名:"
                :min="0"
                :max="1000"
                :step="10"
                placeholder="图片名"
                class="w-full"
            />
        </div>
    </a-modal>
</template>

<script lang="tsx">
export default {
    name: 'PicUploader',
};
</script>
<script lang="tsx" setup>
import { LoadingOutlined, FileImageTwoTone } from '@ant-design/icons-vue';

// 处理图片上传
// 图片上传器是否显示
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { uploadAsset } from '/@/api/public';
import { computed, ref, watch } from 'vue';
const picFile = ref<File | null>(null);
const picUrl = ref('');
const picLoading = ref(false);
const picTitle = ref('');

const props = defineProps<{
    visible: boolean;
    node: any;
    kmind: any;
}>();
const emits = defineEmits<{
    (e: 'update:visible', visible: boolean): void;
}>();
const visible = computed({
    get() {
        return props.visible;
    },
    set() {
        emits('update:visible', !visible.value);
    },
});
const handlePicUpload = async (info: UploadChangeParam) => {
    await uploadAsset({ file: info.file }).then((res) => {
        picUrl.value = `/${res.data.succMap[info.file.name]}`;
    });
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const handlePicBeforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/gif' ||
        file.type === 'image/svg' ||
        file.type === 'image/webp' ||
        file.type === 'image/bmp' ||
        file.type === 'image/tiff';
    if (!isJpgOrPng) {
        message.error(
            '仅支持上传图片格式文件!(jpeg/png/jpg/gif/svg/webp/bmp/tiff)',
        );
        picFile.value = null;
    }
    // 返回false 不使用默认上传action
    return false;
};

const computedPicUrl = computed({
    get() {
        return picUrl.value.includes('http')
            ? picUrl.value
            : `${import.meta.env.VITE_BASE_URL}${picUrl.value}`;
    },
    set(value) {
        picUrl.value = value.includes('http') ? value : `/${value}`;
    },
});

const img = ref<HTMLImageElement | null>(null);
const picWidth = ref();
const picHeight = ref();
const handleOk = () => {
    computedPicUrl.value &&
        props.node.setImage({
            url: computedPicUrl.value,
            title: picTitle.value,
            width: picWidth.value,
            height: picHeight.value,
        });
    visible.value = false;
};
const init = () => {
    picUrl.value = props.node.getData('image') || '';
    picWidth.value = props.node.getData('imageSize')?.width || 0;
    picHeight.value = props.node.getData('imageSize')?.height || 0;
    picTitle.value = props.node.getData('imageTitle') || '';
};
// 根据图片url回填宽高
watch(
    () => computedPicUrl.value,
    async () => {
        const { width, height } = await getSize();
        picWidth.value = width;
        picHeight.value = height;
    },
);
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
const getSize = (): Promise<{ width; height }> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = computedPicUrl.value;
        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height,
            });
        };
        img.onerror = () => {
            resolve({
                width: 0,
                height: 0,
            });
        };
    });
};
</script>

<style scoped></style>
