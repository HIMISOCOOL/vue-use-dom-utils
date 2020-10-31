import Vue from 'vue';
import VueCompositionApi, { defineComponent, ref } from '@vue/composition-api';
import { mount } from '@vue/test-utils';
import { getTheme, provideTheme, useTheme } from '@/theme';

Vue.use(VueCompositionApi);

describe('theme', () => {
    let schema = {
        '--green': 'blue'
    };

    describe('provideTheme', () => {
        it('getTheme should get the css properties from the schema', () => {
            document.documentElement.style.setProperty('--green', 'green');
            const theme = getTheme(schema);
            expect(theme).not.toBeNull();

            expect(theme['--green']).toBe('green');
        });
    });

    describe('useTheme', () => {
        const ChildComponent = defineComponent({
            setup() {
                const theme = useTheme<typeof schema>();
                return {
                    theme
                };
            },
            template: `<div style="background-color: theme['--green']"></div>`
        });
        const ParentComponent = defineComponent({
            components: {
                ChildComponent
            },
            setup() {
                provideTheme(schema);
                const childComponent = ref<typeof ChildComponent | null>(null);
                return {
                    childComponent
                };
            },
            template: `<div><ChildComponent ref="childComponent"></ChildComponent></div>`
        });
        it('useTheme should inject the theme', () => {
            document.documentElement.style.setProperty('--green', 'green');
            const wrapper = mount(ParentComponent);
            const theme = (wrapper.vm.childComponent as any)?.theme;
            expect(theme).toBeTruthy();

            expect(theme?.['--green']).toBe('green');
        });
    });
});
