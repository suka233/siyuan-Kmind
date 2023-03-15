<template>
    <div
        :style="{
            left: `${ctxMenuLeft}px`,
            top: `${ctxMenuTop}px`,
            visibility: ctxMenuVisible ? 'visible' : 'hidden',
        }"
        class="fixed"
    >
        <a-menu
            ref="menuRef"
            mode="vertical"
            :selectable="false"
            @click="handleClick"
        >
            <a-menu-item key="1">xxx</a-menu-item>
            <a-menu-divider></a-menu-divider>
            <a-menu-item key="2">xxxyyy</a-menu-item>
            <a-menu-item key="3">3xxxyyy</a-menu-item>

            <a-sub-menu key="4" title="xxsx">
                <a-menu-item key="5">5xxsx</a-menu-item>
                <a-menu-item key="6">6xxsx</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'ContextMenu',
};
</script>

<script lang="tsx" setup>
import { usePublicStore } from '/@/store/modules/public';
import { ref, toRefs } from 'vue';
import { onClickOutside } from '@vueuse/core';
const publicStore = usePublicStore();
const { ctxMenuLeft, ctxMenuTop, ctxMenuVisible } = toRefs(publicStore);

const menuRef = ref<HTMLElement>();

const handleClick = (e: any) => {
    console.log(e);
};

onClickOutside(menuRef, () => {
    ctxMenuVisible.value = false;
});
</script>

<style scoped></style>
