import express from 'express';
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3000, () => console.log("http://localhost:3000/"))


//rutas
app.get("/usuarios", (req, res) => {
    res.status(200).json({code: 200, message: "Enviando datos de usuario."})
} )