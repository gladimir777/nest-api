import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: String,
  likes: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  coments: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: true,
      },
      avatar: String,
      name: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});
