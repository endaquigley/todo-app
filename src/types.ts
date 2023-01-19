export enum ItemStatus {
  Incomplete,
  Done,
}

export type Item = {
  id: string;
  title: string;
  status: ItemStatus;
  dateCreated: Date;
};
