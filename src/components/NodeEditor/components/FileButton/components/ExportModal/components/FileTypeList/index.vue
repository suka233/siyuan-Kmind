文件类型列表
<template>
    <a-card hoverable class="h-24">
        <div class="flex">
            <div class="mr-2">
                <component
                    :is="props.item.icon"
                    :class="`${props.active ? 'text-blue-500' : ''}`"
                    class="text-4xl"
                />
            </div>
            <div>
                <div class="font-600">{{ props.item.name }}</div>
                <div class="text-xs text-gray-500/80">
                    {{ props.item.content }}
                </div>
            </div>
        </div>
    </a-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    item: any;
    active: boolean;
}>();
</script>

<style scoped></style>
