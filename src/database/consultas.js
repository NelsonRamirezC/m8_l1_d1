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