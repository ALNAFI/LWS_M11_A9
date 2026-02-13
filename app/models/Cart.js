import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    selected: { type: Boolean, default: true },
    productName: { type: String, default: '' },
    pricePerUnit: { type: Number, default: 0 },
    image: { type: String, default: '' },
    seller: { type: String, default: '' },
  },
  { _id: false }
)

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)
