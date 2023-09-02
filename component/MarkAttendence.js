import styled from "@/styles/markAttendence.module.css";
import { BsPersonBoundingBox, BsList } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

function MarkAttendence({ list, date, className }) {
  const [tableContent, setTableContent] = useState([]);
  const [stdName, setStbName] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const pBtn = useRef(null);
  const aBtn = useRef(null);

  const handleAnimationClick = () => {
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
      aBtn.current.blur();
      pBtn.current.blur();
    }, 500);
  };

  const listHandler = () => {
    list();
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

        for (let x = 0; x < apiData.length; x++) {
          if (!apiData[x].attendance) {
            console.log(apiData[x]);
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
                key: "Status",
                value: apiData[x].attendance,
              },
            ]);
            setStbName(apiData[x].studentName);
            return;
          }
        }
      })();
    }
  }, [date, className]);

  return (
    <>
      <div className={styled.topBar}>
        <h4>Class:- {className}</h4>
        <h4>{date}</h4>
        <h4 onClick={listHandler}>
          List <BsList style={{ marginBottom: "-3px", fontSize: "20px" }} />
        </h4>
      </div>
      <div
        className={`${styled.mainBox} ${isAnimating ? styled.animation : ""} `}
      >
        {/* <div className={styled.person}>
          <BsPersonBoundingBox />
        </div> */}
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
          onClick={handleAnimationClick}
          className={styled.present}
          ref={pBtn}
        >
          Present
        </button>
        <button
          onClick={handleAnimationClick}
          className={styled.absent}
          ref={aBtn}
        >
          Absent
        </button>
      </div>
    </>
  );
}

export default MarkAttendence;
