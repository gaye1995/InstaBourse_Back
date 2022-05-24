import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true],
    },
    contenu: {
        type: String,
        required: [true],
    },
    commentaire: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true],
        ref: 'user',
    },
}, { timestamps: true });

const Post = mongoose.model('post', postSchema);

export { Post };
