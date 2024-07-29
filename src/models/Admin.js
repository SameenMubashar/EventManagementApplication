import mongoose from 'mongoose';

const { Schema } = mongoose;

const adminsSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const admin = mongoose.models.admins || mongoose.model('admins', adminsSchema);

export default admin;
