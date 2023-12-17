const express = require('express'); 
const path = require('path'); 
const pool = require('./db')
const cors = require('cors');

app = express();
app.use(express.json())
app.use(cors());

const PORT = 4000
const clientPath = path.resolve(__dirname, '../client/dist')

app.use(express.static(clientPath));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
})

app.get('/api/links', (req, res) => {

    pool.query('SELECT * FROM favlinks',(error, result) => {
        if (error) {
            throw error;
        }
        else{
            res.status(200).json(result.rows);
        }
    });
})

app.get('/api/links/:id', async(req, res) => {
    try {
         const result = await pool.query('SELECT * FROM favlinks where id = $1',[req.params.id]);
         if(result.rows.length > 0){
            res.status(200).json(result.rows);
        }else{
            res.status(404).json({"message":"No resource found based on the id provided"})
        }    
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.delete('/api/links/:id', async(req, res) => {
    try {
        await pool.query('DELETE FROM favlinks where id = $1',[req.params.id]);
        const links = await pool.query('SELECT * FROM  favlinks');
        res.status(200).json(links.rows);  
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.put('/api/links/:id', async(req, res) => {
    try {
        const { name, url } = req.body
        await pool.query('UPDATE favlinks SET name=$1, url=$2 where id=$3 RETURNING *',[name,url,req.params.id]); 
        const links = await pool.query('SELECT * FROM  favlinks');
        res.status(200).json(links.rows);
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/api/links', async(req, res) => {
    try {
        const { name, url } = req.body
        const result = await pool.query('INSERT INTO favlinks(name,url) values($1, $2) RETURNING *',[name,url]); 
        res.status(200).json(result.rows[0]); 
          
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });
