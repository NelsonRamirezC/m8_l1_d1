import express from 'express';
import jwt from 'jsonwebtoken';
import { getUsuarios, getUsuariosById, addUsuario, updateUsuario, deleteUsuariosById, usuarioLogin} from './database/consultas.js' 

const app = express();

let secreto = "1234567";


//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3000, () => console.log("http://localhost:3000/"))


//rutas GET
app.get("/usuarios", (req, res) => {
    getUsuarios().then(usuarios => {
        res.status(200).json({code: 200, data: usuarios})
    }).catch(error => {
        console.log(error)
        res.status(500).json({code: 500, error: "Error al cargar los usuarios."})
    })
})

//rutas GET POR ID
app.get("/usuarios/:id", (req, res) => {
    let id = req.params.id;
    getUsuariosById(id).then(usuario => {
        res.status(200).json({code: 200, data: usuario})
    }).catch(error => {
        console.log(error)
        res.status(500).json({code: 500, error: "Error al cargar los usuarios."})
    })
})

//rutas POR USUARIO
app.post("/usuarios", (req, res) => {
     let {nombre, email, password, imagen} = req.body;
     addUsuario(nombre, email, password, imagen).then(usuario => {
        res.status(201).json({code: 201, data: usuario})
    }).catch(error => {
        console.log(error)
        res.status(500).json({code: 500, error: "Error al agregar un usuario."})
    })
})

//rutas PUT USUARIO
app.put("/usuarios", (req, res) => {
    let {nombre, email, password, imagen, id} = req.body;
    updateUsuario(nombre, email, password, imagen, id).then(usuario => {
       res.status(201).json({code: 201, data: usuario})
   }).catch(error => {
       console.log(error)
       res.status(500).json({code: 500, error: "Error al actualizar el usuario. " + nombre})
   })
})


const validar = (req, res, next) =>{
    let token = req.query.token;
    if(token){
        jwt.verify(token, secreto, (err, decoded) => {
            if(err) return res.status(403).json({code: 401, error: "Usted no tiene los permisos necesarios para eliminar / token invalido."})
           console.log(decoded);
            next()
          });
    }else{
        return res.status(401).json({code: 401, error: "Debe proporcionar un token, debe autenticarse"})
    }
}


//RUTA DELETE USUARIO
app.delete("/usuarios/:id", validar, (req, res) => {
    let id = req.params.id;
    deleteUsuariosById(id).then(usuario => {
        if(usuario.length == 0) return res.status(400).json({code: 400, error: "Ha intentado eliminar un usuario con un id desconocido"})
        res.status(200).json({code: 200, data: usuario})
    }).catch(error => {
        console.log(error)
        res.status(500).json({code: 500, error: "Error al eliminar el usuario con id: " + id})
    })
})


//RUTA DE LOGIN
//rutas POR USUARIO
app.post("/usuarios/login", (req, res) => {
    let {email, password} = req.body;
    usuarioLogin(email, password).then(usuario => {
        if(usuario.length == 0) return res.status(400).json({code: 400, error: "Error en el login"})
        let token = jwt.sign(usuario[0], secreto);
       res.status(200).json({code: 200, token})
   }).catch(error => {
       console.log(error)
       res.status(500).json({code: 500, error: "No se pudo realizar el token."})
   })
})




