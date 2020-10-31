import { ref, onBeforeUnmount, provide, computed, ComputedRef } from '@vue/composition-api';
import type { Ref } from '@vue/composition-api';
import type { Breakpoints } from '.';

export const BreakpointSymbol = Symbol('breakpoints');

export type BreakpointRefs<B> = Record<keyof B, Ref<boolean>>;
export type BreakpointGetters<B> = Record<keyof B, ComputedRef<boolean>>;

/**
 *
 * @param breakpoints An object of breakpoints to use key is the breakpoint name, value is the breakpoint as a number of px
 */
export function useProvideMediaQuery<B extends Breakpoints>(
    breakpoints: B
): void {
    // get all the keys for the breakpoints
    const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>;
    // make an object of refs for if the breakpoint is hit
    const refs = Object.fromEntries(
        keys.map(key => [key, ref<boolean>(false)])
    ) as BreakpointRefs<B>;

    // TODO are these between events useful?
    // const betweenEvents = keys.map((key, index) => {
    //     // the min width part of the media query
    //     const minwidth = `min-width: ${breakpoints[key]}`;
    //     // the index of the next breakpoint if any
    //     const nextBreakpointIndex =
    //         index + 1 === keys.length ? null : index + 1;
    //     // if theres no bigger breakpoint just return the min width
    //     if (nextBreakpointIndex == null) {
    //         return window.matchMedia(minwidth);
    //     }
    //     // else make the max width part
    //     const maxWidth = `max-width: ${breakpoints[nextBreakpointIndex]}`;
    //     return window.matchMedia(`${minwidth} and ${maxWidth}`);
    // });

    // calculate all the minWidth media queries
    const minWidthEvents = keys.map(key => {
        const mm = window.matchMedia(`min-width: ${breakpoints[key]}`);
        // set the refs initial value
        refs[key as string].value = mm.matches;
        return mm;
    });

    const mediaQueryChangeHandler = (index: number) => (ev: MediaQueryListEvent) => {
        const key = keys[index];
        refs[key as string].value = ev.matches;
    };

    // for each minWidth event
    minWidthEvents.forEach((mql, index) =>
        // add an event listener to change the ref
        mql.addEventListener('change', mediaQueryChangeHandler(index))
    );

    const breakpointGetters = Object.fromEntries(keys.map(key => [key, computed(() => refs[key].value)])) as BreakpointGetters<B>

    onBeforeUnmount(() => {
        // clean up all the media queiries
        minWidthEvents.forEach((mql, index) =>
            mql.removeEventListener('change', mediaQueryChangeHandler(index))
        );
    });

    provide(BreakpointSymbol, breakpointGetters);
}
