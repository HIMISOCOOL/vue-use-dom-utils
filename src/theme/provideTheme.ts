import { provide, reactive, Ref } from '@vue/composition-api';
import { useCustomPropety } from '../customProperty';
import type { Schema } from '.';

export const ThemeSymbol = Symbol('theme');

/**
 * Gets the theme from the root css properties
 * @param theme The schema to get values from
 */
export function getTheme<Theme extends Schema>(
    theme: Theme,
    readonly = false
): Schema<Ref<string>> {
    const keys = Object.keys(theme);
    const element = document.documentElement;
    const entries = keys.map(
        key => [key, useCustomPropety(element, key, readonly)] as const
    );
    return Object.fromEntries(entries);
}

/**
 * Provides the theme from the root css properties
 * @param theme The schema to get the values from
 */
export function useProvideTheme<Theme extends Schema>(
    theme: Theme,
    readonly = false
): void {
    const reactiveTheme = reactive(getTheme(theme, readonly));
    provide(ThemeSymbol, reactiveTheme);
}
