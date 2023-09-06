import { Client } from "pg";

export default async (req, res) => {
  console.log(req.body);
  const { rollNo, dateFrom, dateTo } = req.body;

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
      `SELECT *
      FROM
          (SELECT * , TO_CHAR(date, 'yyyy-mm-dd') as "newDate"
              FROM ATTENDANCE
              WHERE "rollNo" = '${rollNo}' ) ATTENDANCE
      WHERE date > '${dateFrom}'
          AND date < '${dateTo}'`
    );
    await client.end();
    res.status(200).json(data.rows);
  } catch {
    await client.end();
    res.status(200).json([]);
  }
};
