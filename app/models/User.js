import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'credentials'
      },
      minLength: 6,
      select: false,
    },
    mobile: {
      type: String,
      trim: true,
      default: '',
    },
    userType: {
      type: String,
      enum: ['customer', 'shopOwner'],
      default: 'customer',
    },
    shopName: {
      type: String,
      trim: true,
      default: '',
    },
    provider: {
      type: String,
      enum: ['credentials', 'google'],
      default: 'credentials',
    },
    providerId: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model('User', userSchema)
