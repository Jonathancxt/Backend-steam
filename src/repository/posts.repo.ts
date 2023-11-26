import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';

const postSchema = new mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        immutable: true
    },
    title: {
        type: String
    },
    content: {
       type: String
    },
    image_url: {
        type: String
    },
    createdAt: {
        type: Date,
        immutable: true
    },
    updatedAt: {
        type: Date
    },
    author: {
        type: String
    },
});

export const Post = mongoose.model('Post', postSchema);

module.exports = {Post};
