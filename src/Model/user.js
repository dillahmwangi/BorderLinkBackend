import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, "Please enter username"],
        min: 6,
        max: 255,
    },
    password: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: [true,"email field is required"],
        unique: true,
        lowercase: true,

    },

    phone: { 
        type: Number, 
        unique: true, 
        required: [true,"Phone Number field is required"]
    },
    country: { 
        type: String, 
        required: [true,"Country field is required"]
    },
    idNo: { 
        type: String, 
        unique: true, 
        required: [true,"ID Number field is required"]
    }
},
    { timestamps: true}
);

export default mongoose.model('User', userSchema);
