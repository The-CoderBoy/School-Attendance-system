import React, { useState } from "react";
import AttendanceTable from "@/component/AttendanceTable";
import style from "@/styles/attendanceRecord.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

function attendanceRecord() {
  const [studentInfo, setStudentInfo] = useState([
    {
      key: "Student Name",
      value: "Honey singh",
    },
    {
      key: "Roll No",
      value: "64643544",
    },
    {
      key: "Father Name",
      value: "yo yo singh",
    },
    {
      key: "Mother Name",
      value: "po po singh",
    },
    {
      key: "Date of Birth",
      value: "1-5-1997",
    },
    {
      key: "Contact No",
      value: "9874563210",
    },
  ]);

  const data = {
    labels: ["Present", "Absent", "NA"],
    datasets: [
      {
        label: "Attendance",
        data: [2, 1, 27],
        backgroundColor: ["#02c436", "#cc0404", "#ccc8cc"],
        borderColor: ["#02c436", "#cc0404", "#ccc8cc"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <table className={style.table}>
        <tbody>
          {studentInfo.map((x, i) => {
            return (
              <tr key={i}>
                <td style={{ width: "120px" }}>{x.key}</td>
                <td>{x.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <table style={{margin:"auto"}}>
        <tbody>
          <tr>
            <td>Presents:-</td>
            <td>2</td>
            <td>Absents:-</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <AttendanceTable />
      <div style={{ width: "300px", margin: "auto" }}>
        <Doughnut data={data} />
      </div>
    </>
  );
  
}

export default attendanceRecord;

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  console.log(query);
  return {
    props: {
      data: "hello",
    },
  };
}
