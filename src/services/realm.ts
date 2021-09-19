import ImageSchema from '../models/ImageSchema';
import EventSchema from '../models/EventSchema';
import Realm from 'realm';

const getRealm = () => {
  return Realm.open({
    schema: [ImageSchema, EventSchema],
  });
};

export default getRealm;