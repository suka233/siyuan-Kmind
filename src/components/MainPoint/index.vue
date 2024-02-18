大纲
<template>
    <side-bar
        title="大纲 & 搜索"
        :class="{ show: activeSidebar === 'mainPoint' }"
    >
        <div>
            <!--            <a-button-->
            <!--                class="w-full"-->
            <!--                title="出于性能考虑，大纲设定为2秒刷新一次，如果需要最新的大纲，可以手动刷新一下"-->
            <!--                @click="test"-->
            <!--                >刷新大纲</a-button-->
            <!--            >-->
            <!--            <a-input-search-->
            <!--                v-model:value="searchValue"-->
            <!--                style="margin-bottom: 8px"-->
            <!--                placeholder="Search"-->
            <!--            />-->
            <a-tree-select
                v-model:value="value"
                v-model:searchValue="searchValue"
                @change="(v) => goTargetNode(v)"
                show-search
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="在此输入以搜索"
                allow-clear
                tree-default-expand-all
                :tree-data="treeData"
                :tree-line="true"
                tree-node-filter-prop="pureTitle"
                :field-names="{
                    label: 'pureTitle',
                    value: 'uid',
                }"
            >
                <template #title="{ pureTitle }">
                    <template
                        v-for="(fragment, i) in pureTitle
                            .toString()
                            .split(
                                new RegExp(
                                    `(?<=${searchValue})|(?=${searchValue})`,
                                    'i',
                                ),
                            )"
                    >
                        <span
                            v-if="
                                fragment.toLowerCase() ===
                                searchValue.toLowerCase()
                            "
                            :key="i"
                            style="color: #08c"
                        >
                            {{ fragment }}
                        </span>
                        <template v-else>{{ fragment }}</template>
                    </template>
                </template>
            </a-tree-select>
            <a-tree
                :tree-data="treeData"
                :show-line="true"
                :show-icon="true"
                :field-names="{
                    label: 'text',
                    value: 'uid',
                }"
            >
                <!--                <template #title="{ title, _node, data, key }">-->
                <template #title="{ uid, pureTitle }">
                    <a @click="goTargetNode(uid)" v-text="pureTitle"></a>
                    <!--                    <a-->
                    <!--                        @click="handleClick(params)"-->
                    <!--                        v-html="params.text"-->
                    <!--                        v-if="!isEditable?.[params.uid]"-->
                    <!--                    ></a>-->
                    <!--                    <quill-editor-->
                    <!--                        v-model:content="editorContent"-->
                    <!--                        v-if="isEditable[params.uid]"-->
                    <!--                        theme="bubble"-->
                    <!--                        content-type="html"-->
                    <!--                        ref="quillRef"-->
                    <!--                        @ready="handleReady"-->
                    <!--                    />-->
                </template>
            </a-tree>
        </div>
    </side-bar>
</template>

<script lang="tsx">
/**
 * 大纲
 */
export default {
    name: 'MainPoint',
};
</script>
<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { ref, toRefs } from 'vue';
import { kmind } from '/@/hooks/useKmind';
// import { TreeProps } from 'ant-design-vue';
// import { QuillEditor, Quill } from '@vueup/vue-quill';
// import '@vueup/vue-quill/dist/vue-quill.bubble.css';
const publicStore = usePublicStore();
// const { buildTreeData } = publicStore;
const { treeData, activeSidebar } = toRefs(publicStore);

// const currentNode = ref<any>();
// const handleClick = (node: any, title) => {
//     // 保存编辑的值
//     if (currentNode.value?.uid) {
//         console.log(currentNode.value);
//         console.log(kmind.renderer.findNodeByUid(currentNode.value?.uid));
//         title = editorContent.value;
//         kmind.renderer
//             .findNodeByUid(currentNode.value?.uid)
//             .setText(editorContent.value, true);
//     }
//
//     // 将其它的quill编辑器销毁
//     isEditable.value = {};
//     // 缓存数据给quill编辑器初始化
//     currentNode.value = node;
//     kmind.execCommand('GO_TARGET_NODE', node.uid);
//
//     // 设置可编辑
//     isEditable.value[node.uid] = true;
// };

// 点击树节点，进入编辑状态
// const handleClick = (params) => {
//     console.log(params);
//     // 保存编辑的值
//     if (currentNode.value?.uid) {
//         console.log(currentNode.value);
//         console.log(kmind.renderer.findNodeByUid(currentNode.value?.uid));
//         params.data.title = editorContent.value;
//         kmind.renderer
//             .findNodeByUid(currentNode.value?.uid)
//             .setText(editorContent.value, true);
//     }
//
//     // 将其它的quill编辑器销毁
//     isEditable.value = {};
//     // 缓存数据给quill编辑器初始化
//     // currentNode.value = params.node;
//     currentNode.value = params;
//     // kmind.execCommand('GO_TARGET_NODE', params.node.uid);
//     kmind.execCommand('GO_TARGET_NODE', params.uid);
//
//     // 设置可编辑
//     // isEditable.value[params.node.uid] = true;
//     isEditable.value[params.uid] = true;
// };

const goTargetNode = (uid) => {
    console.log(uid);
    kmind.execCommand('GO_TARGET_NODE', uid);
};

// const expandedKeys = ref<(string | number)[]>([]);
const searchValue = ref<string>('');
// const autoExpandParent = ref<boolean>(true);

// const onExpand = (keys: string[]) => {
//     expandedKeys.value = keys;
//     autoExpandParent.value = false;
// };

// watch(searchValue, (value) => {
//     const expanded = dataList
//         .map((item: TreeProps['treeData'][number]) => {
//             if (item.title.indexOf(value) > -1) {
//                 return getParentKey(item.key, gData.value);
//             }
//             return null;
//         })
//         .filter((item, i, self) => item && self.indexOf(item) === i);
//     expandedKeys.value = expanded;
//     searchValue.value = value;
//     autoExpandParent.value = true;
// });

const value = ref<string>();
// const editorContent = ref('');
// 是否可编辑
// const isEditable = ref<Record<string, boolean>>({});
// const quill = ref<Quill>();
// const handleReady = (e) => {
//     editorContent.value = currentNode.value.text;
//     quill.value = e;
//     setTimeout(() => {
//         // quill会在初始化时自动插入一个p标签，所以length需要-1
//         quill.value.setSelection(quill.value.getLength() - 1, 0);
//     });
// };

// const test = (v, l, e) => {
//     console.log(treeData.value);
//     console.log(v);
//     console.log(l);
//     console.log(e);
// };
</script>

<style scoped></style>
