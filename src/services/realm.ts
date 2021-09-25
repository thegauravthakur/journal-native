import ImageSchema from '../models/ImageSchema';
import EventSchema from '../models/EventSchema';
import Realm from 'realm';
import { DBType } from './services.types';

const getRealm = () => {
  return Realm.open({
    path: DBType.name,
    schema: [ImageSchema, EventSchema],
  });
};

export default getRealm;
