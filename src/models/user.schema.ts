import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods = {
  comparePassword: async function(plaintext, callback) {
    const isMatch = await bcrypt.compare(plaintext, this.password);
    return callback(null, isMatch);
  },
};
