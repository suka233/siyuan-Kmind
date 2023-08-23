InfoBox：展示信息的盒子，展示保存时间，字数统计等
<template>
    <div class="absolute bottom-5 left-5 text-xs text-gray-400/50">
        <!--      保存提示-->
        <div>
            <span v-show="saveLoading"><LoadingOutlined /> 保存中</span>
            <span v-show="!saveLoading" class="hover:text-black">
                <CheckOutlined class="text-green-700" />{{
                    ` 自动保存成功，最后保存时间：${lastSaveTime}`
                }}</span
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePublicStore } from '/@/store/modules/public';

import { CheckOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { toRefs } from 'vue';

const publicStore = usePublicStore();
const { lastSaveTime, saveLoading } = toRefs(publicStore);
// const countEl = document.createElement('div');

// 统计字数
</script>

<style scoped></style>
