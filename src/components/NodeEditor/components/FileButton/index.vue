<template>
    <a-dropdown-button>
        文件
        <template #overlay>
            <a-menu @click="handleMenuClick">
                <a-menu-item key="import">
                    <DownloadOutlined />
                    导入
                </a-menu-item>
                <a-menu-item key="export">
                    <UploadOutlined />
                    导出
                </a-menu-item>
                <a-menu-item key="saveAs">
                    <delivered-procedure-outlined />
                    另存为
                </a-menu-item>
            </a-menu>
        </template>
    </a-dropdown-button>

    <import-modal v-model:visible="showImportModal" />
    <export-modal v-model:visible="showExportModal" />
</template>

<script lang="tsx" setup>
import {
    UploadOutlined,
    DownloadOutlined,
    DeliveredProcedureOutlined,
} from '@ant-design/icons-vue';
import ImportModal from './components/ImportModal/index.vue';
import ExportModal from './components/ExportModal/index.vue';
import type { MenuProps } from 'ant-design-vue';
import { ref } from 'vue';
// import { useKmind } from '@/components/kmindTab/src/hooks/useKmind';
import { useKmind } from '/@/hooks/useKmind';
// const handleButtonClick = (e: Event) => {
//     console.log('click left button');
// };

const showImportModal = ref(false);
const showExportModal = ref(false);
const { downloadKmind } = useKmind('');
const handleMenuClick: MenuProps['onClick'] = (e: any) => {
    switch (e.key) {
        case 'import':
            showImportModal.value = true;
            break;
        case 'export':
            showExportModal.value = true;
            break;
        case 'saveAs':
            downloadKmind('test', true);
            break;
    }
};
</script>

<style scoped></style>
