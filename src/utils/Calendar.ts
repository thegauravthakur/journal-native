import { format } from 'date-fns';
import { getAllEvents } from '../services/transaction';
import { IEvent } from '../views/types/DayView.types';

export const getEventsToMarkOnCalendar = async (activeDate: Date) => {
  const allEvents = await getAllEvents();
  const set = new Set<string>();
  const result = {};

  allEvents.forEach(event => {
    set.add(format(event.createdAt, 'yyyy-LL-dd'));
  });

  set.forEach((value: string) => {
    result[value] = { marked: true };
  });

  const rest = result[format(activeDate, 'yyyy-LL-dd')];
  result[format(activeDate, 'yyyy-LL-dd')] = { selected: true, ...rest };
  return result;
};
