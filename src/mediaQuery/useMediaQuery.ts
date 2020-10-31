import { inject, computed } from '@vue/composition-api';
import { BreakpointSymbol } from './provideMediaQuery';
import type { BreakpointGetters } from './provideMediaQuery';
import type { Breakpoints } from '.';

/**
 * Injects the media queries into this component.
 * 
 * @throws Error if useProvideMediaQuery was not invoked in a parent component.
 */
export function useMediaQuery<B extends Breakpoints>(): BreakpointGetters<B> {
    const breakpoints = inject<BreakpointGetters<B>>(BreakpointSymbol);
    if (breakpoints == null) {
        throw new Error('useProvideMediaQuery not invoked at parent component.');
    }
    return breakpoints;
}