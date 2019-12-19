import mongoose, { Schema } from 'mongoose'

const vocabularySchema = new Schema({
  text: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

vocabularySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      text: this.text,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Vocabulary', vocabularySchema)

export const schema = model.schema
export default model
