interface ILabelMember {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  requestId: string;
  status: string;
}

interface ILabel {
  id: number;
  name: string;
  visibled: boolean;
  priority: number;
  members: ILabelMember[];
}
