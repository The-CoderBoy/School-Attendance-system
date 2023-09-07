import React, { useEffect, useState } from "react";
import AttendanceTable from "@/component/AttendanceTable";
import style from "@/styles/attendanceRecord.module.css";

import { useRouter } from "next/router";

function attendanceRecord() {
  const router = useRouter();
  const { rollNo } = router.query;
  useEffect(() => {
    (async () => {
      if (rollNo) {
        const sendData = await fetch("/api/studentInfo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rollNo }),
        });
        const res = await sendData.json();
        setStudentInfo([
          {
            key: "Student Name",
            value: res[0].studentName,
          },
          {
            key: "Roll No",
            value: res[0].rollNo,
          },
          {
            key: "Class",
            value: res[0].className,
          },
          {
            key: "Father Name",
            value: res[0].fatherName,
          },
          {
            key: "Mother Name",
            value: res[0].motherName,
          },
          {
            key: "Date of Birth",
            value: res[0].dateOfBirth
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("-"),
          },
          {
            key: "Contact No",
            value: res[0].contactNo === "0" ? "" : res[0].contactNo,
          },
        ]);
      }
    })();
  }, [rollNo]);
  const [studentInfo, setStudentInfo] = useState([]);

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
      <AttendanceTable rollNo={rollNo} />
    </>
  );
}

export default attendanceRecord;
