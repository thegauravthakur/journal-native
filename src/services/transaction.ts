import getRealm from './realm';
import { endOfDay, startOfDay } from 'date-fns';
import Event from '../models/EventSchema';
import uuid from 'react-native-uuid';
import { IImage } from '../views/types/DayView.types';

export const getEventDataForDate = async (date: Date) => {
  const realm = await getRealm();
  return realm
    .objects(Event.schema.name)
    .filtered(
      'createdAt >= $0 && createdAt <= $1',
      startOfDay(date),
      endOfDay(date),
    )
    .sorted('createdAt', true);
};

export const getAllEvents = async () => {
  const realm = await getRealm();
  return realm.objects<Event>(Event.schema.name);
};

export const createNewEvent = async (inputTitle, inputDescription, images) => {
  const realm = await getRealm();
  realm.write(() => {
    const NewEvent = realm.create<Event>(Event.schema.name, {
      _id: uuid.v4().toString(),
      title: inputTitle,
      description: inputDescription,
      createdAt: new Date(),
    });

    for (let i = 0; i < images.length; i++) {
      const image = realm.create<IImage>('Image', {
        _id: uuid.v4().toString(),
        url: images[i].uri,
      });
      if (NewEvent.images) NewEvent.images.push(image);
    }
  });
};

export const insertAndCleanImages = async (
  imagesToDelete,
  inputTitle,
  inputDescription,
  images,
  target,
) => {
  const realm = await getRealm();
  realm.write(() => {
    realm.delete(imagesToDelete);
    target[0].title = inputTitle;
    target[0].description = inputDescription;
    for (let i = 0; i < images.length; i++)
      if (!images[i]._id) {
        const image = realm.create('Image', {
          _id: uuid.v4(),
          url: images[i].uri,
        });
        target[0].images.push(image);
      }
  });
};

export const deleteEvent = async (_id: string) => {
  const realm = await getRealm();
  const allEvents = await getAllEvents();
  let target = allEvents.filtered(`_id == "${_id}"`);
  const Image = target[0].images;
  // @ts-ignore
  const imagesToDelete = Image.filter(image => image._id);
  realm.write(() => {
    realm.delete(imagesToDelete);
    realm.delete(target);
  });
};
