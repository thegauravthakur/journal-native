export const ImageSchema = {
  name: 'Image',
  properties: {
    _id: 'string',
    url: 'string',
  },
  primaryKey: '_id',
};

export const EventSchema = {
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
