import style from "@/styles/studentList.module.css";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

function StudentLIst({ list, stuInfo, date }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(stuInfo);
    console.log(stuInfo)
  }, [stuInfo]);

  const listHandler = () => {
    list();
  };
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
                <span>Status</span>
                <div
                  className={
                    x.status === "P"
                      ? style.present
                      : x.attendance === "A"
                      ? style.absent
                      : style.na
                  }
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
