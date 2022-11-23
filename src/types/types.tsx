export enum Status {Initial, Loading, Succeeded, Failed}

export interface VirtualElement {
  getBoundingClientRect: () => DOMRect,
  contextElement?: Element,
}


export interface Label {
    id: number,
    name: string,
}

export interface Doc {
    id: number,
    title: string,
    content: string,
}