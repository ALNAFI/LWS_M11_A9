import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    condition: {
      type: String,
      enum: ['New', 'Renewed'],
      default: 'New',
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    sku: {
      type: String,
      trim: true,
      default: '',
    },
    availability: {
      type: String,
      enum: ['In Stock', 'Pre-Order', 'Out of Stock'],
      default: 'In Stock',
    },
    warrantyPeriod: {
      type: String,
      trim: true,
      default: '',
    },
    mainImageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    additionalImageUrls: [
      {
        type: String,
        trim: true,
      },
    ],
    processor: { type: String, trim: true, default: '' },
    ram: { type: String, trim: true, default: '' },
    storage: { type: String, trim: true, default: '' },
    displaySize: { type: String, trim: true, default: '' },
    otherSpecs: { type: String, trim: true, default: '' },
    published: {
      type: Boolean,
      default: true,
    },
    purchases: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.models.Product || mongoose.model('Product', productSchema)
