<template>
    <side-bar
        title="导图样式"
        :class="{ show: activeSidebar === 'mindMapStyle' }"
    >
        <div>
            <a-collapse
                v-model:active-key="activeCollapse"
                :bordered="false"
                ghost
            >
                <!--                <a-collapse-panel key="1">-->
                <!--                    <template #header>-->
                <!--                        <p class="text-xl">背景</p>-->
                <!--                    </template>-->
                <!--                    <a-tabs>-->
                <!--                        <a-tab-pane>-->
                <!--                            <div>-->
                <!--                                <div class="colorList" @click="handleColorPick">-->
                <!--                                    <span-->
                <!--                                        class="colorItem"-->
                <!--                                        v-for="item in colorList"-->
                <!--                                        :style="{ backgroundColor: item }"-->
                <!--                                        :key="item"-->
                <!--                                    ></span>-->
                <!--                                </div>-->
                <!--                                <div class="moreColor">-->
                <!--                                    <span>更多颜色</span>-->
                <!--                                    <input-->
                <!--                                        type="color"-->
                <!--                                        v-model="mindMapStyle.backgroundColor"-->
                <!--                                    />-->
                <!--                                </div>-->
                <!--                            </div>-->
                <!--                        </a-tab-pane>-->
                <!--                    </a-tabs>-->
                <!--                </a-collapse-panel>-->
                <a-collapse-panel key="2">
                    <template #header>
                        <p class="text-xl">连线</p>
                    </template>
                    <a-form>
                        <a-row>
                            <a-col :span="12">
                                <a-form-item label="颜色">
                                    <color-popover
                                        v-model:color="mindMapStyle.lineColor"
                                        @update:color="
                                            updateMindMapStyle(
                                                'lineColor',
                                                $event,
                                            )
                                        "
                                        ><div
                                            class="styleBtn"
                                            :style="{
                                                borderColor:
                                                    mindMapStyle.lineColor ??
                                                    '#000',
                                            }"
                                        >
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <span
                                                class="colorShow"
                                                :style="{
                                                    backgroundColor:
                                                        mindMapStyle.lineColor ??
                                                        '#000',
                                                }"
                                            ></span></div
                                    ></color-popover>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="粗细">
                                    <a-select
                                        :options="lineWidthOptions"
                                        v-model:value="mindMapStyle.lineWidth"
                                        @change="
                                            (value) =>
                                                updateMindMapStyle(
                                                    'lineWidth',
                                                    value,
                                                )
                                        "
                                    >
                                        <template #option="{ value }">
                                            <span
                                                class="borderLine"
                                                :style="{
                                                    height: value + 'px',
                                                }"
                                            ></span>
                                        </template>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item label="风格">
                                    <a-select
                                        v-model:value="mindMapStyle.lineStyle"
                                        :options="lineStyleListShow"
                                        :fieldNames="{ label: 'name' }"
                                        @change="
                                            (value) =>
                                                updateMindMapStyle(
                                                    'lineStyle',
                                                    value,
                                                )
                                        "
                                    >
                                        <template #option="{ value }">
                                            <div
                                                v-html="lineStyleMap[value]"
                                            ></div>
                                        </template>
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="12" v-if="showLineRadius">
                                <a-form-item label="圆角">
                                    <a-select
                                        :options="lineRadiusOptions"
                                        v-model:value="mindMapStyle.lineRadius"
                                        @change="
                                            (value) =>
                                                updateMindMapStyle(
                                                    'lineRadius',
                                                    value,
                                                )
                                        "
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col
                                :span="24"
                                v-if="
                                    mindMapStyle.lineStyle === 'curve' &&
                                    showRootLineKeepSameInCurveLayouts
                                "
                            >
                                <a-form-item label="根节点">
                                    <a-radio-group
                                        :options="rootLineKeepSameInCurveList"
                                        button-style="solid"
                                        option-type="button"
                                        v-model:value="
                                            mindMapStyle.rootLineKeepSameInCurve
                                        "
                                        @change="
                                            (e) =>
                                                updateMindMapStyle(
                                                    'rootLineKeepSameInCurve',
                                                    e.target.value,
                                                )
                                        "
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col
                                :span="24"
                                v-if="
                                    mindMapStyle.lineStyle === 'curve' &&
                                    showRootLineKeepSameInCurveLayouts
                                "
                            >
                                <a-form-item label="根节点起始位置">
                                    <a-radio-group
                                        button-style="solid"
                                        v-model:value="
                                            mindMapStyle.rootLineStartPositionKeepSameInCurve
                                        "
                                        @change="
                                            (e) =>
                                                updateMindMapStyle(
                                                    'rootLineStartPositionKeepSameInCurve',
                                                    e.target.value,
                                                )
                                        "
                                    >
                                        <a-radio-button :value="false"
                                            >中心</a-radio-button
                                        >
                                        <a-radio-button :value="true"
                                            >侧边</a-radio-button
                                        >
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="是否显示箭头">
                                    <a-radio-group
                                        button-style="solid"
                                        v-model:value="
                                            mindMapStyle.showLineMarker
                                        "
                                        @change="
                                            (e) =>
                                                updateMindMapStyle(
                                                    'showLineMarker',
                                                    e.target.value,
                                                )
                                        "
                                    >
                                        <a-radio-button :value="true"
                                            >是</a-radio-button
                                        >
                                        <a-radio-button :value="false"
                                            >否</a-radio-button
                                        >
                                    </a-radio-group>
                                </a-form-item>
                            </a-col>
                            <a-col :span="24">
                                <a-form-item label="彩虹线条">
                                    <a-popover>
                                        <div class="curRainbowLine">
                                            <div
                                                class="colorsBar"
                                                v-if="curRainbowLineColorList"
                                            >
                                                <span
                                                    class="colorItem"
                                                    v-for="(
                                                        color, index
                                                    ) in curRainbowLineColorList"
                                                    :key="index"
                                                    :style="{
                                                        backgroundColor: color,
                                                    }"
                                                ></span>
                                            </div>
                                            <span v-else>关闭彩虹线条</span>
                                        </div>
                                        <template #content>
                                            <div class="rainbowLinesOptionsBox">
                                                <div
                                                    class="optionItem"
                                                    v-for="item in rainbowLinesOptions"
                                                    :key="item.value"
                                                >
                                                    <div
                                                        class="colorsBar"
                                                        v-if="item.list"
                                                        @click="
                                                            updateRainbowLinesConfig(
                                                                item,
                                                            )
                                                        "
                                                    >
                                                        <span
                                                            class="colorItem"
                                                            v-for="(
                                                                color, index
                                                            ) in item.list"
                                                            :key="index"
                                                            :style="{
                                                                backgroundColor:
                                                                    color,
                                                            }"
                                                        ></span>
                                                    </div>
                                                    <span
                                                        v-else
                                                        @click="
                                                            updateRainbowLinesConfig(
                                                                item,
                                                            )
                                                        "
                                                        >关闭彩虹线条</span
                                                    >
                                                </div>
                                            </div>
                                        </template>
                                    </a-popover>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-collapse-panel>
                <!--                <a-collapse-panel key="3">-->
                <!--                    <template #header>-->
                <!--                        <p class="text-xl">概要的连线</p>-->
                <!--                    </template></a-collapse-panel-->
                <!--                >-->
                <!--                <a-collapse-panel key="4">-->
                <!--                    <template #header>-->
                <!--                        <p class="text-xl">关联线</p>-->
                <!--                    </template></a-collapse-panel-->
                <!--                >-->
            </a-collapse>
        </div>
    </side-bar>
</template>
<script lang="tsx">
/**
 * 导图样式
 */
export default {
    name: 'MindMapStyle',
};
</script>
<script lang="tsx" setup>
import SideBar from '/@/components/SideBar/index.vue';
import { usePublicStore } from '/@/store/modules/public';
import { computed, ref, toRefs, watch } from 'vue';
// import { colorList } from '/@/config';
import { kmind } from '/@/hooks/useKmind';
import {
    lineRadiusOptions,
    lineStyleList,
    lineStyleMap,
    lineWidthOptions,
    rootLineKeepSameInCurveList,
} from '/@/config/zh';
import {
    rainbowLinesOptions,
    supportLineRadiusLayouts,
    supportLineStyleLayoutsMap,
    supportRootLineKeepSameInCurveLayouts,
} from '/@/config/constant';
import ColorPopover from '/@/components/NodeStyle/components/ColorPopover.vue';
const publicStore = usePublicStore();
const { saveMindMapData } = publicStore;
const { activeSidebar, mindMapStyle, rainbowLinesConfig } = toRefs(publicStore);

const activeCollapse = ref<string[]>(['1', '2', '3', '4']);

// 颜色转换
// const rgbToHex = (rgb: string) => {
//     const rgbArr = rgb.match(/\d+/g);
//     if (!rgbArr) {
//         return '#000000';
//     }
//     const hex = rgbArr.map((item) => {
//         const hex = Number(item).toString(16);
//         return hex.length === 1 ? '0' + hex : hex;
//     });
//     return '#' + hex.join('');
// };
// const handleColorPick = (e: MouseEvent) => {
//     const target = e.target as HTMLElement;
//     if (target.classList.contains('colorItem')) {
//         mindMapStyle.value.backgroundColor = rgbToHex(
//             target.style.backgroundColor,
//         );
//     }
// };

const theme = ref({
    config: {},
});

const updateMindMapStyle = (key: string, value: string) => {
    console.log(value);
    theme.value.config[key] = value;
    // kmind.setThemeConfig(theme.value.config);
    kmind.setThemeConfig(mindMapStyle.value);
    saveMindMapData({ data: kmind.getData(true) });
};

const lineStyleListShow = computed<typeof lineStyleList>(() => {
    const res: typeof lineStyleList = [];
    lineStyleList.forEach((item) => {
        const list = supportLineStyleLayoutsMap[item.value];
        if (list) {
            if (list.includes(currentLayout.value)) {
                res.push(item);
            }
        } else {
            res.push(item);
        }
    });
    return res;
});

const currentLayout = ref('');

// 当前布局与风格是否支持圆角
const showLineRadius = computed(() => {
    return (
        mindMapStyle.value.lineStyle === 'straight' &&
        supportLineRadiusLayouts.includes(currentLayout.value)
    );
});

const showRootLineKeepSameInCurveLayouts = computed(() => {
    return supportRootLineKeepSameInCurveLayouts.includes(currentLayout.value);
});

// 更新彩虹线条配置
const curRainbowLineColorList = ref<string[]>([]);
const updateRainbowLinesConfig = (item: any) => {
    // console.log(item);
    curRainbowLineColorList.value = item.list || null;
    console.log(curRainbowLineColorList.value);
    let newConfig = {};
    if (item.list) {
        newConfig = {
            open: true,
            colorsList: item.list,
        };
    } else {
        newConfig = {
            open: false,
        };
    }

    kmind.rainbowLines.updateRainLinesConfig(newConfig);
    saveMindMapData({ data: kmind.getData(true) });
};

// 切换到此tab时，获取当前的布局
watch(
    () => activeSidebar.value,
    (value) => {
        if (value === 'mindMapStyle') {
            currentLayout.value = kmind.getLayout();

            // 初始化彩虹线条配置
            rainbowLinesConfig.value = kmind.getConfig('rainbowLinesConfig');
            curRainbowLineColorList.value = rainbowLinesConfig.value?.open
                ? kmind.rainbowLines
                    ? kmind.rainbowLines.getColorsList()
                    : null
                : null;
        }
    },
    {
        immediate: true,
    },
);

// 更新lineStyleListShow时，更新当前的lineStyle的value
watch(
    () => lineStyleListShow.value,
    () => {
        const has = lineStyleListShow.value.find(
            (item) => item.value === mindMapStyle.value.lineStyle,
        );
        if (!has) {
            mindMapStyle.value.lineStyle = lineStyleListShow.value[0].value;
        }
    },
    {
        immediate: true,
    },
);
</script>
<style scoped lang="less">
// 让箭头适配标题text-xl的高度，确保箭头居中
.ant-collapse-expand-icon {
    height: 32px;
}

.colorList {
    width: 240px;

    .colorItem {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
    }
}

.borderLine {
    display: inline-block;
    width: 20px;
    background-color: #000;
    margin-right: 5px;
    cursor: pointer;
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

.curRainbowLine {
    //color: hsla(0, 0%, 100%, 0.6);
    height: 24px;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.rainbowLinesOptionsBox {
    width: 200px;

    &.isDark {
        .optionItem {
            color: hsla(0, 0%, 100%, 0.6);

            &:hover {
                background-color: hsla(0, 0%, 100%, 0.05);
            }
        }
    }

    .optionItem {
        width: 100%;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: #f5f7fa;
        }
    }
}

.colorsBar {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;

    .colorItem {
        flex: 1;
        height: 15px;
    }
}
</style>
