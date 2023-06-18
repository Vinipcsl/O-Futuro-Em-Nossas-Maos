const express = require ('express');
const bodyParse = require ('body-parser');
const cors = require ('cors');
const Doador = require('./doador');


const app = express();
app.use(bodyParse.json());
app.use(cors());

app.get('/doadores', async (req, res)=>{
    const doadores = await Doador.encontrarTodos();
    res.json(doadores);
    
});

app.get('/doadores/:id', async(req, res)=>{
    const doador = await Doador.encontrarPorId(req.params.id);
    if(!doador)
    {
        res.status(404).send('Doador não encontrado');
    }
    else
    {
        res.json(doador);
    }
});

app.post('/doadores', async (req, res)=>{
    
    const {nome, sobrenome, telefone} = req.body;
    
    const doador = new Doador (null, nome, sobrenome, telefone);
    
    await doador.salvar();
    
    res.json(doador);
});

app.put('/doadores/:id', async (req, res)=>{
    
    const doador = await Doador.encontrarPorId(req.params.id);
    console.log(`nome + sobrenome + telefone`);
    if(!doador)
    {
        res.status(404).send('Doador não encontrado');
    }
    else
    {
        const {nome, sobrenome, telefone} = req.body;
        doador.nome = nome;
        doador.sobrenome = sobrenome;
        doador.telefone = telefone;
        await doador.salvar();
        res.json(doador);
    }
});

app.delete('/doadores/:id', async (req, res)=>{
    const doador = await Doador.encontrarPorId(req.params.id);
    if(!doador)
    {
        res.status(404).send('Doador não encontrado');
    }
    else
    {
        await doador.excluir();
        res.status(204).send('Doador removido com sucesso!')
    }
});
const porta = process.env.porta || 3000;
app.listen(3000, ()=>{
    console.log(`Servidor rodando na porta ${porta}`);
});