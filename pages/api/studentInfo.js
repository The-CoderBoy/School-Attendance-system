import { Client } from "pg";

export default async (req, res) => {
  console.log(req.body);
  const { rollNo } = req.body;

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  try {
    await client.connect();
    const data = await client.query(
      `select * from studentInfo where "rollNo"='${rollNo}'`
    );
    await client.end();
    res.status(200).json(data.rows);
  } catch {
    await client.end();
    res.status(200).json([]);
  }
};
