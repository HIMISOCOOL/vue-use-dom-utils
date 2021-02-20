import { inject } from '@vue/composition-api';
import { ThemeSymbol } from './provideTheme';
import type { Schema } from '.';

/**
 * Injects the theme into this component
 * 
 * @throws Error if useProvideTheme was not invoked in a parent component.
 */
export function useInjectTheme<Theme extends Schema>(): Theme {
    const theme = inject<Theme>(ThemeSymbol);
    if (theme == null) {
        throw new Error('useProvideTheme not invoked at parent component.');
    }
    return theme;
}