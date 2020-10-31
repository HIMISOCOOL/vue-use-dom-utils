import { provide, ref } from '@vue/composition-api';
import type { Schema } from '.';

export const ThemeSymbol = Symbol('theme');

/**
 * Gets the theme from the root css properties
 * @param theme The schema to get values from
 */
export function getTheme<Theme extends Schema>(theme: Theme): Theme {
    const keys = Object.keys(theme);
    const style = document.documentElement.style;
    const entries = keys.map(key => [key, style.getPropertyValue(key)] as const);
    return Object.fromEntries(entries) as Theme;
}

/**
 * Provides the theme from the root css properties
 * @param theme The schema to get the values from
 */
export function useProvideTheme<Theme extends Schema>(theme: Theme): void {
    const themeRef = ref<Theme>(theme);
    themeRef.value = getTheme(theme);
    provide(ThemeSymbol, themeRef);
}