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
    shopDescription: {
      type: String,
      trim: true,
      default: '',
    },
    shopLocation: {
      type: String,
      trim: true,
      default: '',
    },
    shopAddress: {
      type: String,
      trim: true,
      default: '',
    },
    shopSpecialization: {
      type: String,
      trim: true,
      default: '',
    },
    shopBannerImage: {
      type: String,
      trim: true,
      default: '',
    },
    yearEstablished: {
      type: Number,
      default: null,
    },
    employees: {
      type: Number,
      default: null,
    },
    brandPartnerships: {
      type: String,
      trim: true,
      default: '',
    },
    website: {
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
