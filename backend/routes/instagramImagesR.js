import express from "express";

const instagramRouter = express.Router();

instagramRouter.get("/teste", (req, res) => {
    res.json({
        message: 'Teste inicial'
    });
})

export { instagramRouter } ;