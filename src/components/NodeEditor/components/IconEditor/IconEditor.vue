<template>
    <div v-for="item in nodeIconList" :key="item.name" class="item">
        <div class="title">{{ item.name }}</div>
        <div class="list">
            <div
                v-for="icon in item.list"
                :key="icon.name"
                class="icon"
                :class="{
                    selected: iconList.includes(item.type + '_' + icon.name),
                }"
                @click="setIcon(item.type, icon.name)"
                v-html="icon.icon"
            ></div>
        </div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'IconEditor',
};
</script>

<script lang="tsx" setup>
import { computed, ref, toRefs } from 'vue';
import { nodeIconList } from 'simple-mind-map/src/svg/icons';
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { activeNodeList } = toRefs(publicStore);

const iconList = ref<string[]>([]);
if (activeNodeList.value.length > 0) {
    const firstNode = activeNodeList.value[0];
    iconList.value = firstNode.getData('icon') || [];
} else {
    iconList.value = [];
}

const setIcon = (type, name) => {
    let key = type + '_' + name;
    let index = iconList.value.findIndex((item) => {
        return item === key;
    });
    // 删除icon
    if (index !== -1) {
        iconList.value.splice(index, 1);
    } else {
        let typeIndex = iconList.value.findIndex((item) => {
            return item.split('_')[0] === type;
        });
        // 替换icon
        if (typeIndex !== -1) {
            iconList.value.splice(typeIndex, 1, key);
        } else {
            // 增加icon
            iconList.value.push(key);
        }
    }
    activeNodeList.value.forEach((node) => {
        node.setIcon([...iconList.value]);
    });
};
</script>

<style scoped lang="less">
.item {
    margin-bottom: 20px;
    font-weight: bold;

    .title {
        margin-bottom: 10px;
    }

    .list {
        display: flex;
        flex-wrap: wrap;

        .icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;

            &.selected {
                &::after {
                    content: '';
                    position: absolute;
                    left: -2px;
                    top: -2px;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    border: 2px solid #409eff;
                }
            }
        }
    }
}
</style>
