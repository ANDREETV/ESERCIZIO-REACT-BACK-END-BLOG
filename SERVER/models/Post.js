const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        cover: {
            type: String,
            require: true
        },
        readTime: {
            value: {
                type: String,
                require: true
            },
            unit: {
                type: Number,
                require: true
            }
        },
        author: {
            name: {
                type: String,
                require: true
            },
            avatar: {
                type: String,
                require: true
            }
        },
        content: {
            type: String,
            require: true
        }
    }
);
// Mongoose Model
const postModel = mongoose.model("Posts", blogSchema);

module.exports = postModel