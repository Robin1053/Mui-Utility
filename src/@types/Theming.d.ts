import type { Interpolation, Theme } from '@mui/material/styles';

/**
 * `styleOverrides` einer Komponente. Anders als MUIs `ComponentsOverrides` erhalten Callbacks
 * den vollstaendigen `ownerState` typisiert (Props + abgeleiteter Zustand wie `loading`).
 */
type ThemedStyleOverrides<ClassKey extends string, OwnerState> = Partial<
    Record<ClassKey, Interpolation<{ ownerState: OwnerState; theme: Theme }>>
>;

/**
 * Theme-`variants` einer Komponente. Sie werden zur Laufzeit gegen den `ownerState` gematcht,
 * daher sind auch abgeleitete Werte (z.B. `hasImage`, `type`) als Bedingung erlaubt.
 */
type ThemedVariants<OwnerState> = Array<{
    props:
        | Partial<OwnerState>
        | ((props: Partial<OwnerState> & { ownerState: Partial<OwnerState> }) => boolean);
    style: Interpolation<{ theme: Theme }>;
}>;

export type { ThemedStyleOverrides, ThemedVariants };
