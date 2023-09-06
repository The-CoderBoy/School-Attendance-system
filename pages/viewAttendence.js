import style from "@/styles/addStudent.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

function viewAttendence() {
  const [data, setData] = useState({
    rollNo: "",
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
        <label htmlFor="rollNo">
          Roll No. <span className={style.astric}>*</span>
        </label>
        <input
          className={style.input}
          type="text"
          id="rollNo"
          name="rollNo"
          value={data["rollNo"]}
          onChange={dataHandler}
        />
        <button
          onClick={() => {
            router.push(
              `/attendenceRecord?rollNo=${data["rollNo"]}`
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
