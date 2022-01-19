import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'test'){
            await mongoose.connect("mongodb+srv://samuel:MiMM4TXX4kiofqhO@cluster0.uj3am.mongodb.net/test?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        }
        await mongoose.connect("mongodb+srv://samuel:MiMM4TXX4kiofqhO@cluster0.uj3am.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch(err) {
        console.error(err);
    }
}

export { connectDB };