const app = require('./app')

const connection = require('./models/connection')
const port = 3000;




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


