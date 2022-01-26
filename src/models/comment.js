import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
})

export default mongoose.model('Comment', commentSchema)