import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
    },
    email: {
        type: String,
        required: [true],
    },
    password: {
        type: String,
        required: [true],
    },
    avatar: {
        type: String,
    },
    token: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    reset_password: {
        token: {
            type: String
        },
        date: {
            type: Number
        }
    },
}, { timestamps: true });

const User = mongoose.model('user', userSchema);

export { User };
