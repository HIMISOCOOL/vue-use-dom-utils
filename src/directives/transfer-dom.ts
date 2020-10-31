import { DirectiveOptions } from 'vue';

/**
 * A directive to move an element to another location in the DOM
 * Useful in situations such as z-index management for modals, popups etc.
 * 
 * @author Matthew Meehan <matusmarx@hotmail.com>
 * 
 * @variation Troy Morehouse <https://github.com/tmorehouse/vue-transfer-dom>
 * 
 * @throws Error if the id passed into the directive, I.E. #bar in the example below, does not exist in the DOM
 *
 * @example
 *
 * import { transferDom } from 'vue-use-dom-utils/directives';
 *
 * Vue.directive('transferDom', transferDom);
 *
 * const component = {
 *   // div will be appended to body(default)
 *   template: '<div v-transfer-dom>foo</div>'
 * }
 *
 * // prepend to body
 * const component = {
 *   // div will be prepended to body(default)
 *   template: '<div v-transfer-dom.prepend>foo</div>'
 * }
 *
 * Move to a specific target element identifed by target's id:
 *
 * // append to specific place
 * const component = {
 *   // div will be appended to #bar(document.getElementById)
 *   template: '<div v-transfer-dom:bar>foo</div>'
 * }
 *
 * // prepend to specific place
 * const component = {
 *   // div will be prepended to #bar(document.getElementById)
 *   template: '<div v-transfer-dom:bar.prepend>foo</div>'
 * }
 */
export const transferDom: DirectiveOptions = {
    inserted(el, bindings) {
        const container = bindings.arg
            ? // if passed an argument use this to get the element
              document.getElementById(bindings.arg)
            : // otherwise just use the body
              document.body;

        if (container) {
            // if the prepend option is passed in and the container is not empty
            bindings.modifiers.prepend && container.firstChild
                ? // insert the new element before the first child
                  container.insertBefore(el, container.firstChild)
                : // otherwise just insert it
                  container.appendChild(el);
        } else {
            throw new Error(`target element at #${bindings.arg} not found.`);
        }
    },
    unbind(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }
};
