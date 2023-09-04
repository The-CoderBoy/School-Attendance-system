import style from "@/styles/studentList.module.css";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

function StudentLIst({ list, date, className, selectStuIndex }) {
  const [data, setData] = useState([]);

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
        setData(apiData);
      })();
    }
  }, [date, className]);

  return (
    <>
      <div>
        <BiArrowBack style={{ fontSize: "30px" }} onClick={listHandler} />
      </div>
      <div className={style.outerBlock}>
        {data.map((x, i) => {
          return (
            <div key={i} className={style.block}>
              <h3 style={{ wordWrap: "break-word", width: "60%" }}>
                {x.studentName}
              </h3>
              <div style={{ textAlign: "center" }}>
                <span>Attendance</span>
                <div
                  className={
                    x.attendance === "P"
                      ? style.present
                      : x.attendance === "A"
                      ? style.absent
                      : style.na
                  }
                  onClick={() => {
                    selectStuIndex(i);
                  }}
                >
                  {x.attendance === "P"
                    ? "P"
                    : x.attendance === "A"
                    ? "A"
                    : "NA"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default StudentLIst;
