export interface IGroupData {
  _id: string;
  deleted: boolean;
  name: string;
  totalMembers: number;
  isPublic: boolean;
  owner: string;
  groupValues: any[];
  createdAt: Date;
  updatedAt: Date;
  mySlugTest: string;
  slug: string;
  __v: number;
}

export { IGroupData };
