import mongoose from 'mongoose';


const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    whatIDo: {
        type: String,
        required: true
    },

    email: {
        type: Boolean,
        required: true,
    }
})

export default mongoose.model('Profile', profileSchema)