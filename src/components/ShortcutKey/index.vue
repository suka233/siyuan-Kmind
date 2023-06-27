<template>
    <side-bar title="快捷键" :class="{ show: activeSidebar === 'shortcutKey' }">
        <div class="box">
            <div v-for="item in shortcutKeyList.zh" :key="item.type">
                <div class="title">{{ item.type }}</div>
                <div v-for="item2 in item.list" :key="item2.value" class="list">
                    <div class="item">
                        <span
                            v-if="item2.icon"
                            class="icon iconfont"
                            :class="[item2.icon]"
                        ></span>
                        <span class="name">{{ item2.name }}</span>
                        <div class="value">{{ item2.value }}</div>
                    </div>
                </div>
            </div>
        </div>
    </side-bar>
</template>

<script lang="tsx">
/**
 * 快捷键
 */
export default {
    name: 'ShortcutKey',
};
</script>
<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { toRefs } from 'vue';
import { shortcutKeyList } from '/@/config';
const publicStore = usePublicStore();
const { activeSidebar } = toRefs(publicStore);
</script>

<style scoped lang="less">
.box {
    padding: 0 20px;

    .title {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin: 26px 0 20px;
    }

    .list {
        font-size: 14px;

        .item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            .icon {
                font-size: 16px;
                margin-right: 16px;
            }

            .name {
                color: #333;
            }

            .value {
                color: #909090;
                margin-left: auto;
            }
        }
    }
}
</style>
