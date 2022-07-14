import React, { ChangeEvent } from "react";

export interface IInfoNoId {
  name: string;
  email: string;
  phone: string;
}

export interface IInfo {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

/**
 * this interface was used when building frontend and testing it with local JSON server
 */
export interface IInfoForDevelopement {
  id: number;
  name: string;
  email: string;
  phone: number;
}

export interface ITableRowProps {
  info: IInfo;
  handleDelete(id: string): void;
  // handleEdit(id: string): void;
  handleCheckbox(e: ChangeEvent<HTMLInputElement>): void;
}

export interface IPopUpProps {
  handleAdd(newRecord: IInfoNoId): void;
}

export interface IPopUpEditProps {
  info: IInfo;
  handleEdit(id: string): void;
}
