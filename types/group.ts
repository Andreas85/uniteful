interface Visibility {
  visibilityType?: string;
  cherryPickedUsers?: string[];
}

interface IPayloadUpdataGroup {
  name: string;
  groupValues: string[];
  visibility: Visibility;
}

interface IGroup {
  _id: string;
  name: string;
  totalMembers: number;
  groupValues: any[];
  createdAt: Date;
  slug: string;
  description: string;
  image: string;
}

interface IResponseDataGroup {
  rows: IGroup[],
  count: number,
  success: boolean
}

interface IGroupData {
  data: IResponseDataGroup
}
