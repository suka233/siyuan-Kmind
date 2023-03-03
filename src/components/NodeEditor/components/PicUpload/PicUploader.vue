<template>
    <a-modal v-model:visible="visible" title="插入图片" @ok="handleOk">
        <a-upload-dragger
            :file-list="picFile"
            list-type="picture-card"
            :before-upload="handlePicBeforeUpload"
            @change="handlePicUpload"
        >
            <img v-if="picUrl" :src="computedPicUrl" alt="pic" />

            <div v-else>
                <loading-outlined v-if="picLoading"></loading-outlined>
                <file-image-two-tone
                    v-else
                    class="text-4xl mb-4"
                ></file-image-two-tone>
                <p>点击或者拖拽到此区域上传图片</p>
                <p class="text-gray-500/80">
                    注意：图片会默认保存在思源的/assets/目录下，一旦上传图片，只能手动去目录下删除图片资源，或者使用思源笔记的
                    设置-资源 来管理所有未引用资源
                </p>
            </div>
        </a-upload-dragger>
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
import { computed, ref } from 'vue';
const picFile = ref<File | null>(null);
const picUrl = ref('');
const picLoading = ref(false);

const props = defineProps<{
    visible: boolean;
    node: any;
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
    console.log(info.file);

    await uploadAsset({ file: info.file }).then((res) => {
        console.log(res);
        picUrl.value = res.data.succMap[info.file.name];
        console.log(picUrl.value);
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
        message.error('仅支持上传JPG/PNG文件!');
        picFile.value = null;
    }
    // 返回false 不使用默认上传action
    return false;
};

const computedPicUrl = computed({
    get() {
        return `http://127.0.0.1:6806/${picUrl.value}`;
    },
    set(value) {
        picUrl.value = value;
    },
});
const handleOk = () => {
    props.node.setImage({
        url: computedPicUrl.value,
        title: '',
        width: 20,
        height: 20,
    });
};
</script>

<style scoped></style>
