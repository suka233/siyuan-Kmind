<template>
    <div
        class="side-bar-trigger-container animate-animated animate-slideInLeft fixed left-5 top-20"
        :class="{ show: activeSidebar }"
    >
        <div class="trigger flex flex-col">
            <div
                v-for="item in sideBarTriggerList"
                :key="item.value"
                class="trigger-item flex items-center justify-center"
                :class="{ active: activeSidebar === item.value }"
                @click="
                    activeSidebar === item.value
                        ? setActiveSidebar('')
                        : setActiveSidebar(item.value)
                "
            >
                <component :is="item.icon" class="trigger-icon" />
                <div class="trigger-name">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'SideBarTrigger',
};
</script>

<script lang="tsx" setup>
import { toRefs } from 'vue';
import { usePublicStore } from '/@/store/modules/public';
import { sideBarTriggerList } from '/@/config/zh';
const publicStore = usePublicStore();
const { setActiveSidebar } = publicStore;
const { activeSidebar } = toRefs(publicStore);
</script>

<style scoped lang="less">
.side-bar-trigger-container {
    //@apply fixed left-5 top-20;
    transition: all 0.3s;

    &.show {
        left: 305px;
    }

    .trigger {
        //@apply flex flex-col;
        width: 60px;
        border-color: #eee;
        background-color: #fff;
        box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        overflow: hidden;

        .trigger-item {
            //@apply flex items-center justify-center;
            flex-direction: column;
            height: 60px;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                background-color: #e6e6e6;
            }

            &.active {
                color: #409eff;
                font-weight: bold;
            }

            .trigger-icon {
                font-size: 20px;
                margin-bottom: 5px;
            }

            .trigger-name {
                font-size: 13px;
            }
        }
    }
}
</style>
