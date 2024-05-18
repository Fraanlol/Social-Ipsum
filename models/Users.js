const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  isValidated: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false }
})

userSchema.set('toObject', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.password
  },
  getters: true
})

const User = model('User', userSchema)

module.exports = User
