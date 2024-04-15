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

interface IonPolicy {
  policyType: string;
}

interface Owner {
  name: string;
  email: string;
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}

interface IGroup {
  _id: string;
  deleted: boolean;
  name: string;
  description: string;
  image: string;
  totalMembers: number;
  owner: Owner;
  groupValues: any[];
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  __v: number;
  visibility: Visibility;
  admissionPolicy: IonPolicy;
  registrationPolicy: IonPolicy;
  canJoinGroup: boolean;
  isOwner: boolean;
  isMember: boolean;
  isModerator: boolean;
  hasPendingJoinRequest: boolean;
  userMap: any[];
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
