import { defineConfig } from 'vite-plugin-windicss';

const range = (size, startAt = 1) => {
    return Array.from(Array(size).keys()).map((i) => i + startAt);
};

export default defineConfig({
    /**
     * 配置runtime时使用的工具类
     * @see https://cn.windicss.org/integrations/vite.html#safelist
     */
    safelist: [range(24).map((i) => `w-${i}rem`)],
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@windicss/plugin-animations')({
            settings: {
                animatedSpeed: 1000,
                heartBeatSpeed: 1000,
                hingeSpeed: 2000,
                bounceInSpeed: 750,
                bounceOutSpeed: 750,
                animationDelaySpeed: 1000,
            },
        }),
    ],
});
