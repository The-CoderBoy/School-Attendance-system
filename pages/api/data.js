import { Client } from "pg";
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  password: "admin",
  port: 5432,
});

export default (req, res) => {
  client.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");
    const data = await client.query(`SELECT * FROM classroom`);
    console.log(data);
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  });
};
