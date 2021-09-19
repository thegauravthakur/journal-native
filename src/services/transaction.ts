import getRealm from './realm';
import { endOfDay, startOfDay } from 'date-fns';
import Event from '../models/EventSchema';

export const getEventDataForDate = async (date: Date) => {
  const realm = await getRealm();
  return realm
    .objects('Event')
    .filtered(
      'createdAt >= $0 && createdAt <= $1',
      startOfDay(date),
      endOfDay(date),
    )
    .sorted('createdAt', true);
};

export const getAllEvents = async () => {
  const realm = await getRealm();
  return realm.objects<Event>('Event');
};
