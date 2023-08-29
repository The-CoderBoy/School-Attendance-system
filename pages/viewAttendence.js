import style from "@/styles/addStudent.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

function viewAttendence() {
  const [data, setData] = useState({
    "Stendent Name": "",
    "Roll No": "",
  });
  const router = useRouter();

  const dataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div className={style.card}>
        <label htmlFor="studentName">
          Student Name <span className={style.astric}>*</span>
        </label>
        <input
          className={style.input}
          type="text"
          id="studentName"
          name="Stendent Name"
          value={data["Stendent Name"]}
          onChange={dataHandler}
        />
        <label htmlFor="rollNo">
          Roll No. <span className={style.astric}>*</span>
        </label>
        <input
          className={style.input}
          type="text"
          id="rollNo"
          name="Roll No"
          value={data["Roll No"]}
          onChange={dataHandler}
        />
        <button
          onClick={() => {
            router.push(
              `/attendenceRecord?Stendent Name=${data["Stendent Name"]}&Roll No=${data["Roll No"]}`
            );
          }}
          className={style.addBtn}
        >
          View Attendence
        </button>
      </div>
    </>
  );
}

export default viewAttendence;
