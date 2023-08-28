import style from "@/styles/addStudent.module.css";
import { useRouter } from "next/router";

function viewAttendence() {
  const router = useRouter();

  return (
    <>
      <div className={style.card}>
        <label htmlFor="class">
          Select Class<span className={style.astric}>*</span>
        </label>
        <select id="class" className={style.select}>
          <option value="" key="">
            10th
          </option>
        </select>
        <label htmlFor="date">
          Select Date<span className={style.astric}>*</span>
        </label>
        <input className={style.input} type="date" name="date" id="date" />
        <button
          className={style.addBtn}
          onClick={() => {
            router.push("/attendancePage");
          }}
        >
          Take Attendence
        </button>
      </div>
    </>
  );
}

export default viewAttendence;
