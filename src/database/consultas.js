import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  user: 'node',
  password: '123456',
  database: "m8_l1_d1",
  port: 5432,
  max: 5,
  idleTimeoutMillis: 5000,
  connectionTimeoutMillis: 2000,
})


export const getUsuarios = async () => {
    let usuarios = await pool.query("select id, nombre, email, imagen from usuarios");
    return usuarios.rows;
}

export const getUsuariosById = async (id) => {
    let usuario = await pool.query("select nombre, email, imagen from usuarios where id =$1", [id]);
    return usuario.rows;
}

export const addUsuario= async (nombre, email, password, imagen) => {
    let query =`
        INSERT INTO usuarios(nombre, email, password, imagen)
        values($1, $2, $3, $4) RETURNING *`    
    let usuario = await pool.query(query, [nombre, email, password, imagen]);
    return usuario.rows;
}

export const updateUsuario= async (nombre, email, password, imagen, id) => {
    let query =`
        UPDATE USUARIOS SET nombre = $1, email = $2, password = $3, imagen = $4 where id = $5 RETURNING id, nombre, email, imagen
    `    
    let usuario = await pool.query(query, [nombre, email, password, imagen, id]);
    return usuario.rows;
}

export const deleteUsuariosById = async (id) => {
    let usuario = await pool.query("DELETE FROM usuarios WHERE id =$1 RETURNING id, nombre, email, imagen ", [id]);
    return usuario.rows;
}

export const usuarioLogin = async (email, password) => {
    let usuario = await pool.query("select id, nombre, email, imagen from usuarios where email =$1 AND password = $2", [email, password]);
    return usuario.rows;
}

export const getProductos = async () => {
    let productos = await pool.query("select * from productos");
    return productos.rows;
}

export const getProductosPorId = async (id) => {
    let producto = await pool.query("select * from productos where id = $1", [id]);
    return producto.rows;
}


export const addProducto= async (nombre, descripcion, precio, stock, imagen) => {
    let query =`
        INSERT INTO productos(nombre, descripcion, precio, stock, imagen)
        values($1, $2, $3, $4, $5) RETURNING *`    
    let producto = await pool.query(query, [nombre, descripcion, precio, stock, imagen]);
    return producto.rows;
}