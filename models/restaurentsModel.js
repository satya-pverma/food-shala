import mongoose from 'mongoose';


const restaurentsSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, dropDups: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: true },


});

const userModel = mongoose.model("Restaurents", restaurentsSchema);
export default userModel;