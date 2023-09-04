import styled from "@/styles/markAttendence.module.css";
import { BsPersonBoundingBox, BsList } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

function MarkAttendence({ list, date, className, stuIndex, selectStuIndex }) {
  const [tableContent, setTableContent] = useState([]);
  const [stdName, setStbName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [stuNo, setStuNo] = useState({
    no: "",
    total: "",
  });
  const [newStu, setNewStu] = useState(true);
  const pBtn = useRef(null);
  const aBtn = useRef(null);

  const handleAnimationClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      aBtn.current?.blur();
      pBtn.current?.blur();
    }, 500);
  };

  const listHandler = () => {
    list();
  };

  const selectStudent = (apiData, stuIndex) => {
    setTableContent([
      {
        key: "Roll No",
        value: apiData[stuIndex].rollNo,
      },
      {
        key: "Father Name",
        value: apiData[stuIndex].fatherName,
      },
      {
        key: "Mother Name",
        value: apiData[stuIndex].motherName,
      },
      {
        key: "Contact No",
        value: apiData[stuIndex].contactNo,
      },
      {
        key: "Date Of Birth",
        value: apiData[stuIndex].dateOfBirth
          .slice(0, 10)
          .split("-")
          .reverse()
          .join("-"),
      },
      {
        key: "Attendance",
        value: apiData[stuIndex].attendance,
      },
    ]);
    setStuNo({ no: +stuIndex + 1, total: apiData.length });
    setStbName(apiData[stuIndex].studentName);
  };

  useEffect(() => {
    if (date !== "" && className !== "") {
      (async () => {
        const api = await fetch("/api/studentList", {
          method: "POST",
          "Content-Type": "application/json",
          body: JSON.stringify({ date, className }),
        });
        const apiData = await api.json();

        if (typeof stuIndex === "number") {
          selectStudent(apiData, stuIndex);
        } else {
          for (let x = 0; x < apiData.length; x++) {
            if (!apiData[x].attendance) {
              setTableContent([
                {
                  key: "Roll No",
                  value: apiData[x].rollNo,
                },
                {
                  key: "Father Name",
                  value: apiData[x].fatherName,
                },
                {
                  key: "Mother Name",
                  value: apiData[x].motherName,
                },
                {
                  key: "Contact No",
                  value: apiData[x].contactNo,
                },
                {
                  key: "Date Of Birth",
                  value: apiData[x].dateOfBirth
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-"),
                },
                {
                  key: "Attendance",
                  value: apiData[x].attendance,
                },
              ]);
              setStuNo({ no: +x + 1, total: apiData.length });
              setStbName(apiData[x].studentName);
              return;
            } else {
              setTableContent([]);
              setStuNo({
                no: "",
                total: "",
              });
            }
          }
        }
      })();
    }
  }, [date, className, newStu, stuIndex]);

  const attendance = async (a) => {
    const api = await fetch("/api/attendance", {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        attendance: a,
        date,
        rollNo: tableContent[0]?.value,
        stuIndex,
      }),
    });
    const apiData = await api.json();
    if (apiData.saved) {
      handleAnimationClick();
      if (typeof stuIndex === "number") {
        selectStuIndex("");
      } else {
        setNewStu(!newStu);
      }
    } else {
      alert("Error: something went to wrong ");
    }
  };

  return (
    <>
      <div className={styled.topBar}>
        <h4>Class:- {className}</h4>
        <h4>{date.split("-").reverse().join("-")}</h4>
        <h4 onClick={listHandler}>
          List <BsList style={{ marginBottom: "-3px", fontSize: "20px" }} />
        </h4>
      </div>
      <div className={styled.topBar}>
        <h4>Student No: {stuNo.no}</h4>
        <h4>Total Students: {stuNo.total}</h4>
      </div>
      {tableContent.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>No More Student Left</h2>
        </div>
      ) : (
        <div>
          <div
            className={`${styled.mainBox} ${
              isAnimating ? styled.animation : ""
            } `}
          >
            <p className={styled.name}>{stdName}</p>
            <table className={styled.table}>
              <tbody>
                {tableContent.map((x, i) => {
                  return (
                    <tr key={i}>
                      <td className={styled.td}>{x.key}</td>
                      <td className={styled.td}>{x.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: "5%" }}>
            <button
              onClick={() => attendance("P")}
              className={styled.present}
              ref={pBtn}
            >
              Present
            </button>
            <button
              onClick={() => attendance("A")}
              className={styled.absent}
              ref={aBtn}
            >
              Absent
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MarkAttendence;
