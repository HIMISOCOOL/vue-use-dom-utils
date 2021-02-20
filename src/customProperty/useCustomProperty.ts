import { computed } from '@vue/composition-api';
import type { Ref } from '@vue/composition-api';

export const useCustomPropety = (
    element: HTMLElement,
    property: string,
    readonly = false
): Ref<string> => {
    const getProperty = () =>
        getComputedStyle(element)
            .getPropertyValue(property)
            .trim();
    if (readonly) {
        return computed(getProperty);
    }
    return computed({
        get: getProperty,
        set: value => element.style.setProperty(property, value)
    });
};
