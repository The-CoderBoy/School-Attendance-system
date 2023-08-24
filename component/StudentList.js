import style from "@/styles/studentList.module.css";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

function StudentLIst({ list }) {
  const [data, setData] = useState([
    {
      studentName: "jeta lal pankaj lal gada ",
      status: "P",
    },
    {
      studentName: "Padtha",
      status: "A",
    },
    {
      studentName: "Sadtha",
      status: "NA",
    },
    {
      studentName: "Adtha",
      status: "P",
    },
    {
      studentName: "Padtha",
      status: "A",
    },
    {
      studentName: "Sadtha",
      status: "NA",
    },
    {
      studentName: "Adtha",
      status: "P",
    },
    {
      studentName: "Padtha",
      status: "A",
    },
    {
      studentName: "Sadtha",
      status: "NA",
    },
    {
      studentName: "Padtha",
      status: "A",
    },
    {
      studentName: "Sadtha",
      status: "NA",
    },
    {
      studentName: "Adtha",
      status: "P",
    },
    {
      studentName: "Padtha",
      status: "A",
    },
    {
      studentName: "Sadtha",
      status: "NA",
    },
  ]);

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
                      : x.status === "A"
                      ? style.absent
                      : style.na
                  }
                >
                  {x.status === "P" ? "P" : x.status === "A" ? "A" : "NA"}
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
