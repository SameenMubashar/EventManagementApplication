import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventsSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const event = mongoose.models.event || mongoose.model('event', eventsSchema);

export default event;
