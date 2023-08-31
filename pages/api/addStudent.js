import { Client } from "pg";
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "studentManagementSystem",
  password: "admin",
  port: 5432,
});

client.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("connected");
  }
});

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
  console.log(req.body)
  const data = await client.query(`INSERT INTO 
  studentInfo ("studentName","fatherName","motherName","dateOfBirth","rollNo","className","contactNo") 
  VALUES 
  ('${studentName}','${fatherName}','${motherName}','${dateOfBirth}','${rollNo}',${className},${contactNo})`);
  console.log(data.rows);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify("Hello"));
};
