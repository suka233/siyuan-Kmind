<template>
    <side-bar title="主题" :class="{ show: activeSidebar === 'theme' }">
        <div class="themeList">
            <div
                v-for="item in themeList"
                :key="item.value"
                class="themeItem"
                :class="{ active: item.value === theme }"
                @click="useTheme(item.value)"
            >
                <div class="imgBox">
                    <img :src="themeMap[item.value]" alt="" />
                </div>
                <div class="name">{{ item.name }}</div>
            </div>
        </div>
    </side-bar>
</template>

<script lang="tsx">
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Theme',
};
</script>

<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { ref, toRefs } from 'vue';
import { themeList } from 'simple-mind-map/src/utils/constant';
import { themeMap } from '/@/config/constant';
const publicStore = usePublicStore();
const { activeSidebar, kmind } = toRefs(publicStore);

const theme = ref('');
const useTheme = (item: string) => {
    theme.value = item;
    kmind.value.setTheme(item);
};
</script>

<style scoped lang="less">
.themeList {
    padding: 20px;

    .themeItem {
        width: 100%;
        cursor: pointer;
        border-bottom: 1px solid #e9e9e9;
        margin-bottom: 20px;
        padding-bottom: 20px;
        transition: all 0.2s;
        border: 1px solid transparent;

        &:last-of-type {
            border: none;
        }

        &:hover {
            box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
                0 3px 6px 0 rgba(0, 0, 0, 0.12),
                0 5px 12px 4px rgba(0, 0, 0, 0.09);
        }

        &.active {
            border: 1px solid #67c23a;
        }

        .imgBox {
            width: 100%;

            img {
                width: 100%;
            }
        }
        .name {
            text-align: center;
            font-size: 14px;
        }
    }
}
</style>
