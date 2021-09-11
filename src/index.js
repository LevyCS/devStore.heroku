import db from './db.js'
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json())

app.get('/produto', async(req, resp) =>{
    try {
        let r = await db.tb_produto.findAll({order: [['id_produto', 'desc']]})
        resp.send(r)
    } catch(e) {{erro: resp.send(e.toString())}}
})

app.post('/produto', async(req, resp) => {
    try {
        let {nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, quantidadeEstoque, imagemProduto} = req.body;
            let r = await db.tb_produto.create({nm_produto: nomeProduto, ds_categoria: categoria, vl_preco_de: precoDe, vl_preco_por: precoPor, vl_avaliacao: avaliacao, ds_produto: descricao, qtd_estoque:quantidadeEstoque, img_produto: imagemProduto, bt_ativo: true, dt_inclusao: new Date()})
            resp.send(r);
        } catch (e) { {erro: resp.send(e.toString())}}
})

app.put('/produto/:id', async(req,resp) => {
    try {
        let {nomeProduto, categoria, precoDe, precoPor, avaliacao, descricao, quantidadeEstoque, imagemProduto} = req.body;
        let r = await db.tb_produto.update({nm_produto: nomeProduto, ds_categoria: categoria, vl_preco_de: precoDe, vl_preco_por: precoPor, vl_avaliacao: avaliacao, ds_produto: descricao, qtd_estoque:quantidadeEstoque, img_produto: imagemProduto, bt_ativo: true}, {where: {id_produto: req.params.id}})
        resp.sendStatus(200)
    } catch(e) {{erro: resp.send(e.toString())}}
})

app.delete('/produto/:id', async(req,resp) => {
    try {
        let r = await db.tb_produto.destroy({where: {id_produto: req.params.id }})
        resp.sendStatus(200)
    } catch (e) { {erro: resp.send(e.toString())}}
})

app.listen(process.env.PORT,
    () => console.log(`Server up at port ${process.env.PORT}`))