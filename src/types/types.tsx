export enum Status {Initial, Loading, Succeeded, Failed}

export interface VirtualElement {
  getBoundingClientRect: () => DOMRect,
  contextElement?: Element,
}
