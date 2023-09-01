import style from "@/styles/addStudent.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
  day < 10 ? "0" : ""
}${day}`;

function viewAttendence() {
  const router = useRouter();
  const [data, setData] = useState({
    class: "",
    date: formattedDate,
  });
  const [opt, setOtp] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetch("/api/className");
      const res = await data.json();
      setOtp(res);
    })();
  }, []);

  const dataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <div className={style.card}>
        <label htmlFor="class">
          Select Class<span className={style.astric}>*</span>
        </label>
        <select
          id="class"
          name="class"
          className={style.select}
          onChange={dataHandler}
          value={data.class}
        >
          <option value=""></option>
          {opt.map((x, i) => {
            return (
              <option value={x.className} key={i}>
                {x.className}
              </option>
            );
          })}
        </select>
        <label htmlFor="date">
          Select Date<span className={style.astric}>*</span>
        </label>
        <input
          className={style.input}
          type="date"
          name="date"
          id="date"
          onChange={dataHandler}
          value={data.date}
        />
        <button
          className={style.addBtn}
          onClick={() => {
            if (data.class != "") {
              router.push(
                `/attendancePage?className=${data.class}&date=${data.date}`
              );
            }else{
              alert("Select Class")
            }
          }}
        >
          Take Attendence
        </button>
      </div>
    </>
  );
}

export default viewAttendence;
