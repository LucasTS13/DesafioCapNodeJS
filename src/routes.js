const express = require("express")
const router = express.Router()
const productController = require("./controllers/productController")
router.get("/products", productController.findAll)
router.post("/product", productController.create)
router.patch("/product/:id", productController.update)
router.delete("/product/:id", productController.delete)
module.exports = router