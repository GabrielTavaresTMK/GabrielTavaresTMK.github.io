// importa o express
const express = require('express')
// instancia o express e atribui a "app"
const app = express()
// possibilita que express reconheça objetos request
// como strings ou arrays -> req.body
// urlenconded é formato padrão do formulário recebido
app.use(express.urlencoded({extended: true}));
// inidica que o server vai atender uma requisição POST
// para URL "/alunos"
app.post('/alunos', (req, resp) => {
console.log(req.body)
resp.send('<h1>ENVIADO!</h1>')
})
// inidica que o server vai atender uma requisição POST
// para URL "/alunos/id"
pp.post('/alunos/:id', (req, resp) => {
    console.log(req.body)
    console.log(req.params.id)
    resp.send('<h1>[OK] Nova Alteração Recebida!</h1>')
    })
    console.log('Servidor Executando...')
    // coloca a aplicação para ouvir a porta 3000
    app.listen(3000)
    