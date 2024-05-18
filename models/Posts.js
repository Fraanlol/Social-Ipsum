const { model, Schema } = require('mongoose')

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, required: true }
})

postSchema.set('toObject', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
  },
  getters: true
})

const Posts = model('Post', postSchema)

module.exports = Posts
