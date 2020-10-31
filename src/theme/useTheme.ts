import { inject } from '@vue/composition-api';
import { ThemeSymbol } from './provideTheme';
import type { Schema } from '.';

/**
 * Injects the theme into this component
 */
export function useTheme<T extends Schema>(): T {
    return inject<T>(ThemeSymbol)!;
}