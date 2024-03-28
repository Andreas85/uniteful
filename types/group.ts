interface Visibility {
  visibilityType?: string;
  cherryPickedUsers?: string[];
}

interface IPayloadUpdataGroup {
  name: string;
  groupValues: string[];
  visibility: Visibility;
}

interface IOwner {
  _id: string;
  email: string;
  name?: string;
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
  owner: IOwner;
  isOwner: boolean;
  isMember: boolean;
  isModerator: boolean;
  canJoinGroup: boolean;
  isOrdinaryUser?: boolean; // add at client side
}

interface IResponseDataGroup {
  rows: IGroup[],
  count: number,
  success: boolean
}

interface IGroupData {
  data: IResponseDataGroup
}
