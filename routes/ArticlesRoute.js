const express = require("express");
const ArticleSchema = require("../models/ArticlesSchema.js");
const ArticlesCTRL = require("../controllers/ArticlesCTRL.js");
const ArticleRouter = express.Router();
const multer = require("multer");

//Configurando donde se an a guardar los archivos para el blog
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './img/articles');
    },

    filename: function (req, file, cb) {
        cb(null, 'article' + Date.now() + file.originalname);
    }
});

const uploads = multer({storage});

// Endpoints
ArticleRouter.get("/ctrl-test", ArticlesCTRL.CTRLTest);
ArticleRouter.get("/ctrl-test-2", ArticlesCTRL.SecondCTRLTest);

ArticleRouter.post("/create-article", ArticlesCTRL.CreateArticle);
ArticleRouter.get("/all-articles", ArticlesCTRL.getArticles);
ArticleRouter.get("/one-article/:id", ArticlesCTRL.getOneArticle);
ArticleRouter.delete("/delete/:id", ArticlesCTRL.deleteArticle);
ArticleRouter.put("/update/:id", ArticlesCTRL.updateArticle);
ArticleRouter.post("/upload", [uploads.single('file')], ArticlesCTRL.uploadDocument);

module.exports =  ArticleRouter;
