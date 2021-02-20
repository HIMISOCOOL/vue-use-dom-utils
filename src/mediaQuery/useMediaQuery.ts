import { onBeforeUnmount, ref } from '@vue/composition-api';
import type { Ref } from '@vue/composition-api';

export const useMediaQuery = (mediaQuery: string): Ref<boolean> => {
    const matches = ref(false);
    const mediaQueryChangeHandler = (value: boolean) => {
        matches.value = value;
    };
    const mql = window.matchMedia(mediaQuery);
    mediaQueryChangeHandler(mql.matches);
    mql.addEventListener('change', ev => mediaQueryChangeHandler(ev.matches));

    onBeforeUnmount(() => {
        mql.removeEventListener('change', ev =>
            mediaQueryChangeHandler(ev.matches)
        );
    });

    return matches;
};
