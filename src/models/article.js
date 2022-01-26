import mongoose from 'mongoose';


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    },

    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

export default mongoose.model('Article', articleSchema)