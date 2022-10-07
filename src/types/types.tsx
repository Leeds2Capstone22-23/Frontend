export interface VirtualElement {
  getBoundingClientRect: () => DOMRect,
  contextElement?: Element,
}
