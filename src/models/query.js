import mongoose from 'mongoose';


const querySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    message: {
        type: Boolean,
        required: true,
        default: false
    }
})

export default mongoose.model('Query', querySchema)