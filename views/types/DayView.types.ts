export interface IImage {
  _id: 'string';
  uri: 'string';
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  images: IImage[];
}
