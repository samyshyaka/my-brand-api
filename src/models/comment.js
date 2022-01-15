import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Comment', commentSchema)