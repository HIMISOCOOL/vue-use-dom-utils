module.exports = {
    css: {
        extract: false
    },
    chainWebpack: config => {
        config.externals({
            vue: 'vue',
            '@vue/composition-api': '@vue/composition-api'
        });
    }
};
