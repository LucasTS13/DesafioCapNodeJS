const knex = require("../database/knex")
const { v4 } = require("uuid")
module.exports = {
    async findAll(req, res) {
        try {
            const products = await knex("products").select("id", "name", "description")
            return res.json(products)
        } catch (error) {
            return res.json(error)
        }
    },

    async create(req, res) {
        const { name, description } = req.body
        try {
            const product = await knex("products").select("*").where({name}).first()
            if(product) {
                return res.json({"message": "Produto já cadastrado"})
            }
            await knex("products").insert({
                id: v4(),
                name,
                description
            })
            return res.json({"message": "Produto cadastrado com sucesso"})
        } catch (error) {
            return res.json(error) 
        }
    },

    async update(req, res) {
        const { id } = req.params
        const productUpdate = req.body
        try {
            const product = await knex("products").select("*").where({id}).first()
            if (!product) {
                return res.json({"message": "Produto não existe"})
            }
            await knex("products").update(productUpdate).where({id})
            return res.json({"message": "Produto atualizado"})
        } catch (error) {
            return res.json(error)
        }
    },

    async delete(req, res) {
        const { id } = req.params
        try {
            const product = await knex("products").select("*").where({id}).first()
            if(!product){
                return res.json({"message": "Produto não existe"})
            }
            await knex("products").delete().where({id})
            return res.json({"message": "Produto deletado"})
        } catch (error) {
            return res.json(error)
        }
    }
}