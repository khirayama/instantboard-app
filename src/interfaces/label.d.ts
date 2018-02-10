interface ILabelMember {
  id: number;
  name: string;
  imageUrl: string;
  requestId: number;
  status: string;
}

interface ILabel {
  id: number;
  name: string;
  visibled: boolean;
  priority: number;
  members: ILabelMember[];
}
