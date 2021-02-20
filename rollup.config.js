import * as path from 'path';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const builds = {
    'cjs-dev': {
        outFile: 'vue-use-dom-utils.common.js',
        format: 'cjs',
        mode: 'development'
    },
    'cjs-prod': {
        outFile: 'vue-use-dom-utils.common.prod.js',
        format: 'cjs',
        mode: 'production'
    },
    'umd-dev': {
        outFile: 'vue-use-dom-utils.js',
        format: 'umd',
        mode: 'development'
    },
    'umd-prod': {
        outFile: 'vue-use-dom-utils.prod.js',
        format: 'umd',
        mode: 'production'
    },
    esm: {
        outFile: 'vue-use-dom-utils.esm.js',
        format: 'es',
        mode: 'development'
    }
};

function onwarn(msg, warn) {
    if (!/Circular/.test(msg)) {
        warn(msg);
    }
}

function getAllBuilds() {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return Object.keys(builds).map(key => genConfig(builds[key]));
}

function genConfig({ outFile, format, mode }) {
    const isProd = mode === 'production';
    return {
        input: './src/index.ts',
        output: {
            file: path.join('./dist', outFile),
            format: format,
            globals: {
                vue: 'Vue'
            },
            exports: 'named',
            name: format === 'umd' ? 'VueUseDomUtils' : undefined
        },
        external: ['vue', '@vue/composition-api'],
        onwarn,
        plugins: [
            typescript({
                tsconfigOverride: {
                    declaration: false,
                    declarationDir: null,
                    emitDeclarationOnly: false
                },
                useTsconfigDeclarationDir: true
            }),
            resolve(),
            isProd && terser()
        ].filter(Boolean)
    };
}

let buildConfig;

if (process.env.TARGET) {
    buildConfig = [genConfig(builds[process.env.TARGET])];
} else {
    buildConfig = getAllBuilds();
}

export default buildConfig;
