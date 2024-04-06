//  布局结构图片映射
import logicalStructure from '../assets/img/logicalStructure.png';
import mindMap from '../assets/img/mindMap.png';
import organizationStructure from '../assets/img/organizationStructure.png';
import catalogOrganization from '../assets/img/catalogOrganization.png';
import timeline from '../assets/img/timeline.png';
import timeline2 from '../assets/img/timeline2.png';
import fishbone from '../assets/img/fishbone.png';
import verticalTimeline from '../assets/img/verticalTimeline.png';
export const layoutImgMap = {
    logicalStructure,
    mindMap,
    organizationStructure,
    catalogOrganization,
    timeline,
    timeline2,
    fishbone,
    verticalTimeline,
};

//  主题图片映射
import defaultPic from '../assets/img/default.jpg';
import classic from '../assets/img/classic.jpg';
import minions from '../assets/img/minions.jpg';
import pinkGrape from '../assets/img/pinkGrape.jpg';
import mint from '../assets/img/mint.jpg';
import gold from '../assets/img/gold.jpg';
import vitalityOrange from '../assets/img/vitalityOrange.jpg';
import greenLeaf from '../assets/img/greenLeaf.jpg';
import dark2 from '../assets/img/dark2.jpg';
import skyGreen from '../assets/img/skyGreen.jpg';
import classic2 from '../assets/img/classic2.jpg';
import classic3 from '../assets/img/classic3.jpg';
import classic4 from '../assets/img/classic4.jpg';
import classicGreen from '../assets/img/classicGreen.jpg';
import classicBlue from '../assets/img/classicBlue.jpg';
import blueSky from '../assets/img/blueSky.jpg';
import brainImpairedPink from '../assets/img/brainImpairedPink.jpg';
import dark from '../assets/img/dark.jpg';
import earthYellow from '../assets/img/earthYellow.jpg';
import freshGreen from '../assets/img/freshGreen.jpg';
import freshRed from '../assets/img/freshRed.jpg';
import romanticPurple from '../assets/img/romanticPurple.jpg';
import simpleBlack from '../assets/img/simpleBlack.jpg';
import courseGreen from '../assets/img/courseGreen.jpg';
import coffee from '../assets/img/coffee.jpg';
import redSpirit from '../assets/img/redSpirit.jpg';
import blackHumour from '../assets/img/blackHumour.jpg';
import lateNightOffice from '../assets/img/lateNightOffice.jpg';
import blackGold from '../assets/img/blackGold.jpg';
import autumn from '../assets/img/autumn.jpg';
import avocado from '../assets/img/avocado.jpg';
import orangeJuice from '../assets/img/orangeJuice.jpg';

export const themeMap = {
    default: defaultPic,
    classic,
    minions,
    pinkGrape,
    mint,
    gold,
    vitalityOrange,
    greenLeaf,
    dark2,
    skyGreen,
    classic2,
    classic3,
    classic4,
    classicGreen,
    classicBlue,
    blueSky,
    brainImpairedPink,
    dark,
    earthYellow,
    freshGreen,
    freshRed,
    romanticPurple,
    simpleBlack,
    courseGreen,
    coffee,
    redSpirit,
    blackHumour,
    lateNightOffice,
    blackGold,
    autumn,
    avocado,
    orangeJuice,
};

export const supportLineStyleLayoutsMap = {
    curve: ['logicalStructure', 'mindMap', 'verticalTimeline'],
    direct: [
        'logicalStructure',
        'mindMap',
        'organizationStructure',
        'verticalTimeline',
    ],
};

// 支持的线条半径布局
export const supportLineRadiusLayouts = [
    'logicalStructure',
    'mindMap',
    'verticalTimeline',
];

export const supportRootLineKeepSameInCurveLayouts = [
    'logicalStructure',
    'mindMap',
];

// 彩虹线条配置
export const rainbowLinesOptions = [
    {
        label: 'close',
        value: 'close',
    },
    {
        label: 'colors1',
        value: 'colors1',
        list: [
            'rgb(255, 213, 73)',
            'rgb(255, 136, 126)',
            'rgb(107, 225, 141)',
            'rgb(151, 171, 255)',
            'rgb(129, 220, 242)',
            'rgb(255, 163, 125)',
            'rgb(152, 132, 234)',
        ],
    },
    {
        label: 'colors2',
        value: 'colors2',
        list: [
            'rgb(248, 93, 93)',
            'rgb(255, 151, 84)',
            'rgb(255, 214, 69)',
            'rgb(73, 205, 140)',
            'rgb(64, 192, 255)',
            'rgb(84, 110, 214)',
            'rgb(164, 93, 220)',
        ],
    },
    {
        label: 'colors3',
        value: 'colors3',
        list: [
            'rgb(140, 240, 231)',
            'rgb(74, 210, 255)',
            'rgb(65, 168, 243)',
            'rgb(49, 128, 205)',
            'rgb(188, 226, 132)',
            'rgb(113, 215, 123)',
            'rgb(120, 191, 109)',
        ],
    },
    {
        label: 'colors4',
        value: 'colors4',
        list: [
            'rgb(169, 98, 99)',
            'rgb(245, 125, 123)',
            'rgb(254, 183, 168)',
            'rgb(251, 218, 171)',
            'rgb(138, 163, 181)',
            'rgb(131, 127, 161)',
            'rgb(84, 83, 140)',
        ],
    },
    {
        label: 'colors5',
        value: 'colors5',
        list: [
            'rgb(255, 229, 142)',
            'rgb(254, 158, 41)',
            'rgb(248, 119, 44)',
            'rgb(232, 82, 80)',
            'rgb(182, 66, 98)',
            'rgb(99, 54, 99)',
            'rgb(65, 40, 82)',
        ],
    },
    {
        label: 'colors6',
        value: 'colors6',
        list: [
            'rgb(171, 227, 209)',
            'rgb(107, 201, 196)',
            'rgb(55, 170, 169)',
            'rgb(18, 135, 131)',
            'rgb(74, 139, 166)',
            'rgb(75, 105, 150)',
            'rgb(57, 75, 133)',
        ],
    },
];
