import mongoose from 'mongoose'
import crypto from 'crypto'

const passwordResetTokenSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tokenHash: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.PasswordResetToken ||
  mongoose.model('PasswordResetToken', passwordResetTokenSchema)

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}
