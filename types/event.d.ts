interface IEvents {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  slug: string;
}


interface Visibility {
  visibilityType?: string;
  cherryPickedUsers?: string[];
}

interface IPayloadUpdataEvent {
  name: string;
  groupValues: string[];
  visibility: Visibility;
}

interface IEventDetail {
  _id: string;
  image: string;
  deleted: boolean;
  name: string;
  owner: Owner;
  description: string;
  visibility: Visibility;
  registrationPolicy: IonPolicy;
  admissionPolicy: IonPolicy;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  __v: number;
  canJoinEvent: boolean;
  isOwner: boolean;
  isAttendee: boolean;
  userMap: any[];
}

interface IonPolicy {
  policyType: string;
}

interface Owner {
  email: string;
  id: string;
  roles: string[];
  iat: number;
  exp: number;
}

interface Visibility {
  visibilityType: string;
  cherryPickedUsers: any[];
}
