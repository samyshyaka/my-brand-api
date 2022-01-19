import mongoose from 'mongoose';

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGOHQ_URL || 'mongodb+srv://samuel:MiMM4TXX4kiofqhO@cluster0.uj3am.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true        
        })
    } catch(err) {
        console.error(err);
    }
}

export { connectDB };