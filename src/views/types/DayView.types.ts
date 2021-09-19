export interface IImage {
  _id: string;
  uri?: string;
  url?: string;
}

export interface IEvent {
  _id: string | undefined;
  title: string | undefined;
  description: string | undefined;
  createdAt: Date | undefined;
  images: IImage[] | undefined;
}
