const ArticlesSchema = require("../models/ArticlesSchema.js");
const Articles = require("../models/ArticlesSchema.js");
const validator = require("validator");

const ArticlesCTRL = {

    CTRLTest: ( req, res ) => {
        return res.status(200).send({
            message: "Ruta de prueba",
        })
    },

    SecondCTRLTest: ( req, res ) => {
        return res.status(200).send({
            message: "Segunda ruta de prueba",
        })
    },

    CreateArticle: (req, res ) => {

        //Tomando los datos
        const articleData = req.body;

        //Validando los datos (usando Validator)
        try {

            let validateTitle = !validator.isEmpty(articleData.title);
            let validateContent = !validator.isEmpty(articleData.content);

            if( !validateTitle || !validateContent ) {
                throw new Error("No se ha podido validar la informacion");
            }

        } catch (error) {
            return res.status(400).send({
                success: false,
                message: "Ha ocurrido un error lol"
            })
        }

        //Creando el objeto que se va a guardar en BBDD
        const article = new Articles(articleData);

        article.save();
        
        return res.status(200).send({
            success: true,
            message: "Articulo creado",
            article
        })

    },

    getArticles: async (req, res) => {

        try {

            let findArticles = await Articles.find({}).exec(); //Buscando todos los articulos
            
            return res.status(200).send({
                success: true,
                findArticles
            })

        } catch (error) {
            
            return res.status(500).send({
                success: false,
                message: "Error al obtener los artículos",
                error: error.message,
            });
        }
    
    },

    getOneArticle: async (req, res) => {

        let articleID = req.params.id;
        let article = await Articles.findById(articleID).exec();

        if (!article) {
            return res.status(400).send({
                success: false,
                message: "No se ha encontrado el articulo"
            });
        }

        return res.status(200).send({
            success: true,
            message: "Articulo encontrado",
            article
        });

    },

    deleteArticle: async (req, res) => {

        let articleID = req.params.id;
        let deletedArticle = await ArticlesSchema.findByIdAndDelete(articleID).exec();

        if (!deletedArticle) {
            return res.status(400).send({
                success: false,
                message: "El articulo que intenta eliminar no se encuentra"
            });
        }

        return res.status(200).send({
            succes: true,
            message: "Articulo eliminado con exito",
            deletedArticle
        });
    },

    updateArticle: async (req, res) => {
        
        let id = req.params.id;
        let title = req.body.title;
        let updatedArticle = await ArticlesSchema.findOneAndUpdate({_id: id}, {title}, {new: true});

        if (!updatedArticle) {
            return res.status(400).send({
                success: false,
                message: "No se pudo actualizar el articulo"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Articulo actualizado",
            updatedArticle
        });

    },

    uploadDocument: async (req, res) => {

        //Configuracion de multer en el archivo ArticlesRoute.js

        //

        return res.status(200).send({
            succes: true,
            file: req.file
        });
    }

}

module.exports = ArticlesCTRL;