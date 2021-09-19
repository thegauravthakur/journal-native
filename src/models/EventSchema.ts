const Event = {
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

export default Event;
