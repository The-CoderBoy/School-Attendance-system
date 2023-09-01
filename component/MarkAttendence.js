import styled from "@/styles/markAttendence.module.css";
import { BsPersonBoundingBox, BsList } from "react-icons/bs";
import { useRef, useState } from "react";

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

function MarkAttendence({ list, stuInfo, date, className }) {
  const [tableContent, setTableContent] = useState([
    {
      key: "Roll No",
      value: "464615311",
    },
    {
      key: "Father Name",
      value: "rudra pratap",
    },
    {
      key: "Mother Name",
      value: "asdfg ffsfsdf",
    },
    {
      key: "Contact No",
      value: "1234567890",
    },
    {
      key: "Date Of Birth",
      value: "01-01-1999",
    },
    {
      key: "Status",
      value: "P",
    },
  ]);
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
        <div className={styled.person}>
          <BsPersonBoundingBox />
        </div>
        <p className={styled.name}>Gotam Adani</p>
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
