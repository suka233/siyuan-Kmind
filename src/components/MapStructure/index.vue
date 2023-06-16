<template>
    <side-bar title="结构" :class="{ show: activeSidebar === 'structure' }">
        <div class="layoutList">
            <div
                v-for="item in layoutList"
                :key="item.value"
                class="layoutItem"
                :class="{ active: item.value === layout }"
                @click="useLayout(item.value)"
            >
                <div class="imgBox">
                    <img :src="layoutImgMap[item.value]" alt="" />
                </div>
                <div class="name">{{ item.name }}</div>
            </div>
        </div>
    </side-bar>
</template>

<script lang="tsx">
export default {
    name: 'MapStructure',
};
</script>

<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { ref, toRefs } from 'vue';
import { layoutList } from 'simple-mind-map/src/constants/constant';
import { layoutImgMap } from '/@/config/constant';
const publicStore = usePublicStore();
const { activeSidebar } = toRefs(publicStore);
const props = defineProps<{
    kmind: any;
}>();
const layout = ref('');
const useLayout = (item: any) => {
    layout.value = item;
    props.kmind.setLayout(item);
};
</script>

<style lang="less" scoped>
.layoutList {
    padding: 20px;

    .layoutItem {
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
