<template>
    <a-modal
        v-model:visible="visible"
        title="插入图片"
        @ok="handleOk"
        :width="800"
    >
        <a-row v-show="picUrl">
            <a-col :span="4"><span>调整宽度：</span></a-col>
            <a-col :span="12">
                <a-slider v-model:value="picWidth" :min="1" :max="1000" />
            </a-col>
            <a-col :span="8">
                <a-input-number
                    v-model:value="picWidth"
                    addon-before="宽度"
                    class="w-full"
                    :min="1"
                    :max="1000"
                />
            </a-col>
        </a-row>
        <a-upload-dragger
            :file-list="picFile"
            list-type="picture-card"
            :before-upload="handlePicBeforeUpload"
            @change="handlePicUpload"
        >
            <img
                v-show="picUrl"
                ref="img"
                :src="picUrl"
                alt="pic"
                :style="{ width: `${picWidth}px`, height: `${picHeight}px` }"
            />

            <div v-show="!picUrl">
                <loading-outlined v-if="picLoading" />
                <file-image-two-tone v-else class="text-4xl mb-4" />
                <p>点击或者拖拽到此区域上传图片</p>
                <p class="text-gray-500/80">注意：图片会内嵌在此导图的数据中</p>
            </div>
        </a-upload-dragger>
        <a-input
            addon-before="请输入图片标题"
            v-model:value="picTitle"
            v-show="picUrl"
            class="w-4/5"
            allow-clear
        />
        <a-button @click="handleClearPic" v-show="picUrl" class="w-1/5">
            <clear-outlined class="!mb-2" />
            清除图片</a-button
        >
    </a-modal>
</template>

<script lang="tsx">
export default {
    name: 'PicToBase64Modal',
};
</script>
<script lang="tsx" setup>
// 处理图片上传
import {
    LoadingOutlined,
    FileImageTwoTone,
    ClearOutlined,
} from '@ant-design/icons-vue';
import { computed, ref, toRefs, watch } from 'vue';
import { message, UploadChangeParam, UploadProps } from 'ant-design-vue';
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { node, kmind } = toRefs(publicStore);

const props = defineProps<{
    visible: boolean;
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

const picFile = ref<File | null>(null);
const picUrl = ref('');
const picLoading = ref(false);
const picTitle = ref('');

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

const handlePicUpload = async (info: UploadChangeParam) => {
    picUrl.value = await convertImageToBase64(info.file);
    console.log(picUrl.value);
};

// 图片转为base64,ChatGpt写的
const convertImageToBase64 = (file): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            resolve(reader.result as string);
        };

        reader.onerror = (error) => {
            reject(error);
        };
    });
};

const handleOk = () => {
    node.value.setImage({
        url: picUrl.value,
        title: picTitle.value,
        width: picWidth.value,
        height: picHeight.value,
    });
    visible.value = false;
};

watch(
    () => props.visible,
    (val) => {
        if (val) {
            init();
            kmind.value.renderer.startTextEdit();
        } else {
            kmind.value.renderer.endTextEdit();
        }
    },
);

const getSize = (): Promise<{ width; height }> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = picUrl.value;
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
// 根据图片url回填宽高

// 长宽比
const rate = ref(1);
const picWidth = ref();
const picHeight = computed({
    get() {
        return picWidth.value * rate.value ?? 0;
    },
    set(val) {
        picWidth.value = val / rate.value;
    },
});
watch(
    () => picUrl.value,
    async () => {
        const { width, height } = await getSize();
        rate.value = height / width;
        picWidth.value = width;
    },
);

const handleClearPic = () => {
    picWidth.value = 0;
    picUrl.value = '';
    picTitle.value = '';
};

const init = () => {
    picUrl.value = node.value.getData('image') || '';
    picWidth.value = node.value.getData('imageSize')?.width || 0;
    picHeight.value = node.value.getData('imageSize')?.height || 0;
    picTitle.value = node.value.getData('imageTitle') || '';
};
</script>

<style scoped lang="less">
.image-box {
    @apply relative;

    .image-mask {
        @apply absolute top-0 left-0 right-0 bottom-0 bg-blue-500/50;
    }
}
</style>
