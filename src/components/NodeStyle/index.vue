<template>
    <side-bar :class="{ show: activeSidebar === 'nodeStyle' }">
        <template #title>
            <span
                class="box-border"
                :style="{
                    fontFamily: getNodeStyle.fontFamily,
                    fontWeight: getNodeStyle.fontWeight,
                    fontStyle: getNodeStyle.fontStyle,
                    textDecoration: getNodeStyle.textDecoration,
                    // fontSize: `${getNodeStyle.fontSize}px`,
                    color: getNodeStyle.color,
                    borderColor: getNodeStyle.borderColor,
                    borderWidth: `${getNodeStyle.borderWidth ?? 0}px`,
                    borderRadius: `${getNodeStyle.borderRadius ?? 0}px`,
                    backgroundColor: getNodeStyle.fillColor,
                }"
                >节点样式
            </span>
        </template>
        <div class="styleBox" v-if="activeNodeList.length > 0">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="normal" tab="常态">
                    <div>
                        <a-form
                            :label-col="{ span: 6 }"
                            :wrapper-col="{ span: 18 }"
                        >
                            <p class="text-xl mb-2 ml-1">文字</p>
                            <a-row :gutter="24">
                                <a-col :span="24">
                                    <a-form-item
                                        label="字体"
                                        :label-col="{ span: 3 }"
                                    >
                                        <a-select
                                            :value="getNodeStyle.fontFamily"
                                            @change="
                                                (e) => update('fontFamily', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in fontFamilyList.zh"
                                                :key="item.value"
                                                :value="item.value"
                                                :style="{
                                                    fontFamily: item.value,
                                                }"
                                                >{{ item.name }}
                                            </a-select-option>
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="字号">
                                        <a-select
                                            :value="getNodeStyle.fontSize"
                                            @change="
                                                (e) => update('fontSize', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in fontSizeList"
                                                :key="item"
                                                :value="item"
                                                :style="{
                                                    fontSize: item + 'px',
                                                }"
                                                >{{ item }}</a-select-option
                                            >
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="行高">
                                        <a-select
                                            v-model:value="
                                                getNodeStyle.lineHeight
                                            "
                                            @change="
                                                (e) => update('lineHeight', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in lineHeightList"
                                                :key="item"
                                                :value="item"
                                                >{{ item }}</a-select-option
                                            >
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="6">
                                    <color-popover
                                        :color="getNodeStyle.color"
                                        @update:color="update('color', $event)"
                                        ><div
                                            class="styleBtn"
                                            :style="{
                                                color: getNodeStyle.color,
                                            }"
                                        >
                                            A
                                            <span
                                                class="colorShow"
                                                :style="{
                                                    backgroundColor:
                                                        getNodeStyle.color ||
                                                        '#000',
                                                }"
                                            ></span></div
                                    ></color-popover>
                                </a-col>
                                <a-col :span="6">
                                    <div
                                        class="styleBtn"
                                        :class="{
                                            active:
                                                getNodeStyle.fontWeight ===
                                                'bold',
                                        }"
                                        @click="
                                            update(
                                                'fontWeight',
                                                getNodeStyle.fontWeight ===
                                                    'bold'
                                                    ? 'normal'
                                                    : 'bold',
                                            )
                                        "
                                    >
                                        B
                                    </div></a-col
                                >
                                <a-col :span="6">
                                    <div
                                        class="styleBtn i"
                                        :class="{
                                            active:
                                                getNodeStyle.fontStyle ===
                                                'italic',
                                        }"
                                        @click="
                                            update(
                                                'fontStyle',
                                                getNodeStyle.fontStyle ===
                                                    'italic'
                                                    ? 'normal'
                                                    : 'italic',
                                            )
                                        "
                                    >
                                        I
                                    </div></a-col
                                >
                                <a-col :span="6">
                                    <a-popover>
                                        <template #content>
                                            <a-radio-group
                                                v-model:value="
                                                    getNodeStyle.textDecoration
                                                "
                                                @change="
                                                    update(
                                                        'textDecoration',
                                                        getNodeStyle.textDecoration,
                                                    )
                                                "
                                                button-style="solid"
                                            >
                                                <a-radio-button
                                                    value="underline"
                                                    >下划线</a-radio-button
                                                >
                                                <a-radio-button
                                                    value="line-through"
                                                    >中划线</a-radio-button
                                                >
                                                <a-radio-button value="overline"
                                                    >上划线</a-radio-button
                                                >
                                                <a-radio-button value="none"
                                                    >取消</a-radio-button
                                                >
                                            </a-radio-group>
                                        </template>
                                        <div
                                            class="styleBtn u"
                                            :style="{
                                                textDecoration:
                                                    getNodeStyle.textDecoration ||
                                                    'none',
                                            }"
                                        >
                                            U
                                        </div>
                                    </a-popover>
                                </a-col>
                            </a-row>
                            <p class="text-xl mb-2 mt-6 ml-1">边框</p>
                            <a-row :gutter="24">
                                <a-col :span="12">
                                    <a-form-item label="颜色">
                                        <color-popover
                                            v-model:color="
                                                getNodeStyle.borderColor
                                            "
                                            @update:color="
                                                update('borderColor', $event)
                                            "
                                            ><div
                                                class="styleBtn"
                                                :style="{
                                                    borderColor:
                                                        getNodeStyle.borderColor ??
                                                        '#000',
                                                }"
                                            >
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span
                                                    class="colorShow"
                                                    :style="{
                                                        backgroundColor:
                                                            getNodeStyle.borderColor ??
                                                            '#000',
                                                    }"
                                                ></span></div
                                        ></color-popover>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="样式">
                                        <a-select
                                            v-model:value="
                                                getNodeStyle.borderDasharray
                                            "
                                            @change="
                                                (e) =>
                                                    update('borderDasharray', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in borderDasharrayList"
                                                :key="item.value"
                                                :value="item.value"
                                                >{{
                                                    item.name
                                                }}</a-select-option
                                            >
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="宽度">
                                        <a-select
                                            v-model:value="
                                                getNodeStyle.borderWidth
                                            "
                                            @change="
                                                (e) => update('borderWidth', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in borderWidthList"
                                                :key="item"
                                                :value="item"
                                                :label="item"
                                            />
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="圆角">
                                        <a-select
                                            v-model:value="
                                                getNodeStyle.borderRadius
                                            "
                                            @change="
                                                (e) => update('borderRadius', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in borderRadiusList"
                                                :key="item"
                                                :value="item"
                                                :label="item"
                                            />
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <p class="text-xl mb-2 mt-2 ml-1">背景</p>
                            <a-row :gutter="24">
                                <a-col :span="24">
                                    <a-form-item
                                        label="颜色"
                                        :label-col="{ span: 3 }"
                                    >
                                        <color-popover
                                            v-model:color="
                                                getNodeStyle.fillColor
                                            "
                                            @update:color="
                                                update('fillColor', $event)
                                            "
                                            ><div
                                                class="styleBtn"
                                                :style="{
                                                    backgroundColor:
                                                        getNodeStyle.fillColor,
                                                }"
                                            >
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span
                                                    class="colorShow"
                                                    :style="{
                                                        backgroundColor:
                                                            getNodeStyle.fillColor,
                                                    }"
                                                ></span></div
                                        ></color-popover>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <p class="text-xl mb-2 mt-2 ml-1">形状</p>
                            <a-row :gutter="24">
                                <a-col :span="24">
                                    <a-form-item
                                        label="形状"
                                        :label-col="{ span: 3 }"
                                    >
                                        <a-select
                                            v-model:value="getNodeStyle.shape"
                                            @change="(e) => update('shape', e)"
                                        >
                                            <a-select-option
                                                v-for="item in shapeList"
                                                :key="item.value"
                                                :value="item.value"
                                                >{{
                                                    item.name
                                                }}</a-select-option
                                            ></a-select
                                        >
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <p class="text-xl mb-2 mt-2 ml-1">线条</p>
                            <a-row :gutter="24">
                                <a-col :span="12">
                                    <a-form-item label="颜色">
                                        <color-popover
                                            v-model:color="
                                                getNodeStyle.lineColor
                                            "
                                            @update:color="
                                                update('lineColor', $event)
                                            "
                                            ><div
                                                class="styleBtn"
                                                :style="{
                                                    borderColor:
                                                        getNodeStyle.lineColor ??
                                                        '#000',
                                                }"
                                            >
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span
                                                    class="colorShow"
                                                    :style="{
                                                        backgroundColor:
                                                            getNodeStyle.lineColor ??
                                                            '#000',
                                                    }"
                                                ></span></div
                                        ></color-popover>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="样式">
                                        <a-select
                                            v-model:value="
                                                getNodeStyle.lineDasharray
                                            "
                                            @change="
                                                (e) =>
                                                    update('lineDasharray', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in borderDasharrayList"
                                                :key="item.value"
                                                :value="item.value"
                                                >{{
                                                    item.name
                                                }}</a-select-option
                                            >
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item label="宽度">
                                        <a-select
                                            v-model:value="
                                                getNodeStyle.lineWidth
                                            "
                                            @change="
                                                (e) => update('lineWidth', e)
                                            "
                                        >
                                            <a-select-option
                                                v-for="item in borderWidthList"
                                                :key="item"
                                                :value="item"
                                                :label="item"
                                            />
                                        </a-select>
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <p class="text-xl mb-2 mt-2 ml-1">节点内边距</p>
                            <a-row :gutter="24">
                                <a-col :span="24">
                                    <a-form-item label="水平">
                                        <a-slider
                                            v-model:value="
                                                getNodeStyle.paddingX
                                            "
                                            @change="
                                                (e) => update('paddingX', e)
                                            "
                                        />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-item label="垂直">
                                        <a-slider
                                            v-model:value="
                                                getNodeStyle.paddingY
                                            "
                                            @change="
                                                (e) => update('paddingY', e)
                                            "
                                        />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form>
                    </div>
                </a-tab-pane>
                <!--                <a-tab-pane key="active" tab="选中状态">-->
                <!--                    <a-form-->
                <!--                        :label-col="{ span: 6 }"-->
                <!--                        :wrapper-col="{ span: 18 }"-->
                <!--                    >-->
                <!--                        <p class="text-xl mb-2 mt-1 ml-1">边框</p>-->
                <!--                        <a-row :gutter="24">-->
                <!--                            <a-col :span="12">-->
                <!--                                <a-form-item label="颜色">-->
                <!--                                    <color-popover-->
                <!--                                        v-model:color="getNodeStyle.borderColor"-->
                <!--                                        @update:color="-->
                <!--                                            update('borderColor', $event)-->
                <!--                                        "-->
                <!--                                        ><div-->
                <!--                                            class="styleBtn"-->
                <!--                                            :style="{-->
                <!--                                                borderColor:-->
                <!--                                                    getNodeStyle.borderColor ??-->
                <!--                                                    '#000',-->
                <!--                                            }"-->
                <!--                                        >-->
                <!--                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                <!--                                            <span-->
                <!--                                                class="colorShow"-->
                <!--                                                :style="{-->
                <!--                                                    backgroundColor:-->
                <!--                                                        getNodeStyle.borderColor ??-->
                <!--                                                        '#000',-->
                <!--                                                }"-->
                <!--                                            ></span></div-->
                <!--                                    ></color-popover>-->
                <!--                                </a-form-item>-->
                <!--                            </a-col>-->
                <!--                            <a-col :span="12">-->
                <!--                                <a-form-item label="样式">-->
                <!--                                    <a-select-->
                <!--                                        v-model:value="-->
                <!--                                            getNodeStyle.borderDasharray-->
                <!--                                        "-->
                <!--                                        @change="-->
                <!--                                            (e) => update('borderDasharray', e)-->
                <!--                                        "-->
                <!--                                    >-->
                <!--                                        <a-select-option-->
                <!--                                            v-for="item in borderDasharrayList"-->
                <!--                                            :key="item.value"-->
                <!--                                            :value="item.value"-->
                <!--                                            >{{ item.name }}</a-select-option-->
                <!--                                        >-->
                <!--                                    </a-select>-->
                <!--                                </a-form-item>-->
                <!--                            </a-col>-->
                <!--                            <a-col :span="12">-->
                <!--                                <a-form-item label="宽度">-->
                <!--                                    <a-select-->
                <!--                                        v-model:value="getNodeStyle.borderWidth"-->
                <!--                                        @change="-->
                <!--                                            (e) => update('borderWidth', e)-->
                <!--                                        "-->
                <!--                                    >-->
                <!--                                        <a-select-option-->
                <!--                                            v-for="item in borderWidthList"-->
                <!--                                            :key="item"-->
                <!--                                            :value="item"-->
                <!--                                            :label="item"-->
                <!--                                        />-->
                <!--                                    </a-select>-->
                <!--                                </a-form-item>-->
                <!--                            </a-col>-->
                <!--                            <a-col :span="12">-->
                <!--                                <a-form-item label="圆角">-->
                <!--                                    <a-select-->
                <!--                                        v-model:value="-->
                <!--                                            getNodeStyle.borderRadius-->
                <!--                                        "-->
                <!--                                        @change="-->
                <!--                                            (e) => update('borderRadius', e)-->
                <!--                                        "-->
                <!--                                    >-->
                <!--                                        <a-select-option-->
                <!--                                            v-for="item in borderRadiusList"-->
                <!--                                            :key="item"-->
                <!--                                            :value="item"-->
                <!--                                            :label="item"-->
                <!--                                        />-->
                <!--                                    </a-select>-->
                <!--                                </a-form-item>-->
                <!--                            </a-col>-->
                <!--                        </a-row>-->
                <!--                        <p class="text-xl mb-2 mt-2 ml-1">背景</p>-->
                <!--                        <a-row :gutter="24">-->
                <!--                            <a-col :span="24">-->
                <!--                                <a-form-item-->
                <!--                                    label="颜色"-->
                <!--                                    :label-col="{ span: 3 }"-->
                <!--                                >-->
                <!--                                    <color-popover-->
                <!--                                        v-model:color="getNodeStyle.fillColor"-->
                <!--                                        @update:color="-->
                <!--                                            update('fillColor', $event)-->
                <!--                                        "-->
                <!--                                        ><div-->
                <!--                                            class="styleBtn"-->
                <!--                                            :style="{-->
                <!--                                                backgroundColor:-->
                <!--                                                    getNodeStyle.fillColor,-->
                <!--                                            }"-->
                <!--                                        >-->
                <!--                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
                <!--                                            <span-->
                <!--                                                class="colorShow"-->
                <!--                                                :style="{-->
                <!--                                                    backgroundColor:-->
                <!--                                                        getNodeStyle.fillColor,-->
                <!--                                                }"-->
                <!--                                            ></span></div-->
                <!--                                    ></color-popover>-->
                <!--                                </a-form-item>-->
                <!--                            </a-col>-->
                <!--                        </a-row>-->
                <!--                    </a-form>-->
                <!--                </a-tab-pane>-->
                <a-tab-pane key="icon" tab="图标"><icon-editor /></a-tab-pane>
            </a-tabs>
            <div class="sidebarContent">
                <!--                常态-->
            </div>
        </div>
        <div class="tipBox" v-else>
            <api-outlined class="text-7xl tipIcon mb-5" />
            <div class="tipText">请选择一个节点</div>
        </div>
    </side-bar>
</template>

<script lang="tsx">
export default {
    name: 'NodeStyle',
};
</script>

<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { computed, ref, toRefs } from 'vue';
import { ApiOutlined } from '@ant-design/icons-vue';
import ColorPopover from './components/ColorPopover.vue';
import {
    fontFamilyList,
    fontSizeList,
    lineHeightList,
    borderDasharrayList,
    borderWidthList,
    borderRadiusList,
    shapeList,
} from '/@/config';
import IconEditor from '/@/components/NodeEditor/components/IconEditor/IconEditor.vue';
const publicStore = usePublicStore();
const { activeSidebar, activeNodeList, nodeActiveStyle, nodeNormalStyle } =
    toRefs(publicStore);
const activeKey = ref<'normal' | 'active' | 'icon'>('normal');
// 设置节点的样式，是normal态还是active态
const isActive = computed(() => activeKey.value === 'active');
// 获取当前节点的样式，是normal态还是active态
const getNodeStyle = computed(() => {
    return isActive.value ? nodeActiveStyle.value : nodeNormalStyle.value;
});

// import { useDebounceFn } from '@vueuse/core';
// // 防抖更新节点的样式
// const debounceUpdate = useDebounceFn((prop: string, e: any) => {
//     update(prop, e);
// }, 500);
// 更新节点的样式
const update = (prop: string, e: any) => {
    activeNodeList.value.forEach((node) => {
        // console.log(isActive.value);
        node.setStyle(prop, e, isActive.value);
    });
};
</script>

<style scoped lang="less">
.styleBox {
    width: 100%;
    display: flex;

    .tab {
        flex-grow: 0;
        flex-shrink: 0;
        padding: 0 20px;
    }

    .styleBtn {
        position: relative;
        width: 50px;
        height: 30px;
        background: #fff;
        border: 1px solid #eee;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        cursor: pointer;
        border-radius: 4px;

        &.active {
            background-color: #eee;
        }

        &.disabled {
            background-color: #f5f7fa !important;
            border-color: #e4e7ed !important;
            color: #c0c4cc !important;
            cursor: not-allowed !important;
        }

        &.i {
            font-style: italic;
        }

        .colorShow {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 2px;
        }
    }
}

.tipBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666;
}
</style>
