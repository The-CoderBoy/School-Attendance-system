import { Client } from "pg";

export default async (req, res) => {
  const {
    studentName,
    fatherName,
    motherName,
    dateOfBirth,
    rollNo,
    className,
    contactNo,
  } = req.body;

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  try {
    await client.connect();
    const data = await client.query(`INSERT INTO 
      studentInfo ("studentName","fatherName","motherName","dateOfBirth","rollNo","className","contactNo") 
      VALUES 
      ('${studentName}','${fatherName}','${motherName}','${dateOfBirth}','${rollNo}',${className},${
      contactNo === "" ? 0 : contactNo
    })`);
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
