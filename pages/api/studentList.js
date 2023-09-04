import { Client } from "pg";

export default async (req, res) => {
  const { date, className } = JSON.parse(req.body);
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  console.log(date,className)
  try {
    await client.connect();
    const data = await client.query(
      `SELECT * FROM studentInfo
      LEFT JOIN ( SELECT * FROM attendance WHERE date = '${date}') attendance
      ON studentInfo."rollNo" = attendance."rollNo"
      WHERE studentInfo."className" = ${className}
      order by studentInfo."studentName" asc`
    );
    await client.end();
    res.status(200).json(data.rows);
  } catch {
    await client.end();
    res.status(200).json([]);
  }
};
