import style from "@/styles/addStudent.module.css";
import { useRouter } from "next/router";

function viewAttendence() {
  const router = useRouter()
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
        />
        <label htmlFor="rollNo">
          Roll No. <span className={style.astric}>*</span>
        </label>
        <input className={style.input} type="text" id="rollNo" name="Roll No" />
        <button onClick={()=>{
          router.push("/attendenceRecord")
        }} className={style.addBtn}>View Attendence</button>
      </div>
    </>
  );
}

export default viewAttendence;
