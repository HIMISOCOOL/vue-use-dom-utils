# vue-use-dom-utils

A set of utilities using the vue 2 composition api for manipulating and reacting to the DOM.

## Composition Functions

-   MediaQuery
    ```typescript
    // Provides a readonly object of whether a set of breakpoints are active
    useProvideMediaQuery(breakpoints);
    ```
    ```typescript
    // Injects the readonly object from the provider
    useMediaQuery<BreakPoints>();
    ```
-   Theme
    ```typescript
    // Provides a readonly object of theme variables from the css
    useProvideTheme(theme);
    ```
    ```typescript
    // Injects the readonly object from the provider
    useTheme<Theme>();
    ```

## Directives

-   TransferDom

    A directive to move an element to another location in the DOM
    Useful in situations such as z-index management for modals, popups etc.

## Project setup

```
pnpm install
```

### Compiles and minifies for publishing

```
pnpm run build:library
```

### Run your unit tests

```
pnpm run test:unit
```

### Lints and fixes files

```
pnpm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
