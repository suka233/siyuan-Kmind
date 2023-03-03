<template>
    <div>
        <div id="vditor"></div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'RemarkNoteEditor',
};
</script>

<script lang="tsx" setup>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { onMounted, ref } from 'vue';
const vditor = ref<Vditor>();

const props = defineProps<{
    kmind: any;
}>();

onMounted(() => {
    vditor.value = new Vditor('vditor', {
        minHeight: 280,
        focus() {
            props.kmind.renderer.startTextEdit();
        },
        blur() {
            props.kmind.renderer.endTextEdit();
        },
        counter: {
            enable: true,
            type: 'text',
        },
    });
});
</script>

<style scoped></style>
