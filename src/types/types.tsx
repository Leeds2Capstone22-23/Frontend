/* eslint-disable @typescript-eslint/naming-convention */
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
  color: number,
}

export interface Doc {
  id: number,
  title: string,
  content: string,
  time_added: string,
}

export interface Snippet {
  id: number,
  document_id: number,
  label_id: number,
  length: number,
  char_offset: number,
}
