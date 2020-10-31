import { provide, ref } from '@vue/composition-api';
import type { Schema } from '.';

export const ThemeSymbol = Symbol();

/**
 * Gets the theme from the root css properties
 * @param schema The schema to get values from
 */
export function getTheme<T extends Schema>(schema: T): T {
    const keys = Object.keys(schema);
    const style = document.documentElement.style;
    const entries = keys.map(key => [key, style.getPropertyValue(key)] as const);
    return Object.fromEntries(entries) as T;
}

/**
 * Provides the theme from the root css properties
 * @param schema The schema to get the values from
 */
export function provideTheme<T extends Schema>(schema: T): void {
    const themeRef = ref<T>(schema);
    themeRef.value = getTheme(schema);
    provide(ThemeSymbol, themeRef);
}