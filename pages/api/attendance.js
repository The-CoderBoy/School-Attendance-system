import { Client } from "pg";

export default async (req, res) => {
  const { attendance, date, rollNo } = JSON.parse(req.body);
  console.log(attendance, date, rollNo);
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  try {
    await client.connect();
    const data = await client.query(`insert into
        attendance ("rollNo","date","attendance")
        values ('${rollNo}','${date}','${attendance}')`);
    await client.end();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ saved: true }));
  } catch {
    await client.end();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ saved: false }));
  }
};
