export enum Status {Initial, Loading, Succeeded, Failed}


export interface VirtualElement {
  getBoundingClientRect: () => DOMRect,
  contextElement?: Element,
}

export interface UserAuth {
    userSecret: string,
    username: string,
    fullName: string,
    userId: number,
}

export interface newUserRegistration {
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
}

export interface newUserLogin {
    userName: string,
    password: string,
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