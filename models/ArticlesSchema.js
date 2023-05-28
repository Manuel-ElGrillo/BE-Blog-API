const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String,
        default: "default.png"
    }
});

module.exports = mongoose.model("ArticleSchema", ArticleSchema); //("Nombre el Schema / modelo que voy a usar", El Schema / modelo que voy a usar)