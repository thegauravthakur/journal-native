import { IImage } from '../views/types/DayView.types';

class Event {
  public static schema: Realm.ObjectSchema = {
    name: 'Event',
    properties: {
      _id: 'string',
      title: 'string',
      description: 'string',
      createdAt: 'date',
      images: {
        type: 'list',
        objectType: 'Image',
      },
    },
    primaryKey: '_id',
  };

  public _id: string;
  public title: string;
  public description: string;
  public createdAt: Date;
  public images?: IImage[];
}

export default Event;
