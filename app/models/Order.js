import mongoose from 'mongoose'

const ORDER_ITEM_STATUSES = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  productName: { type: String, default: '' },
  pricePerUnit: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ORDER_ITEM_STATUSES,
    default: 'Pending',
  },
}, { _id: false })

const shippingAddressSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  street: { type: String, default: '' },
  city: { type: String, default: '' },
  country: { type: String, default: '' },
  phone: { type: String, default: '' },
}, { _id: false })

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    itemsSubtotal: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    orderTotal: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Order || mongoose.model('Order', orderSchema)
