const mongoos = require('mongoose');

const studentScheme = new mongoos.Schema({
  name: {
    type: String,
    default: function() {
      return this._doc.last_name + this._doc.first_name;
    },
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: /(\w*)@(\w.*$)/,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
  },
  phone: {
    type: String,
    required: [true, 'phone number should have (XXX) XXXXXXX format'],
    validate: {
      validator: function(d) {
        return /\((\d{3})\)\s(\d{7})/.test(d);
      },
      message: '{VALUE} is not a valid phone number'
    }
  },
});

export const Students = mongoos.model('Student', studentScheme);