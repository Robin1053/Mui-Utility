/**
 * `shouldForwardProp` fuer styled-Slots, die eine MUI-Komponente umhuellen.
 *
 * MUIs Default filtert `ownerState`/`theme`/`sx`/`as`, beim Slot `root` aber zusaetzlich
 * `classes` - das wuerde z.B. `Props.ButtonProps.classes` stillschweigend verschlucken.
 */
function shouldForwardSlotProp(prop: PropertyKey): boolean {
    return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as';
}

export { shouldForwardSlotProp };
