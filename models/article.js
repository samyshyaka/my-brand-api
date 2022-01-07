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
    }
})

export default mongoose.model('Article', articleSchema)