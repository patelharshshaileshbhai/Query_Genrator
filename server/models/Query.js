import mongoose from 'mongoose';

const querySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'open',
    enum: ['open', 'in-progress', 'resolved']
  },
});

const Query = mongoose.model('Query', querySchema);

export default Query;
