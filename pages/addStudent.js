import styles from "@/styles/addStudent.module.css";
import { useEffect, useRef, useState } from "react";

function addStudents() {
  const focus = useRef(null);
  const [data, setData] = useState({
    studentName: "",
    fatherName: "",
    motherName: "",
    dateOfBirth: "",
    rollNo: "",
    className: "",
    contactNo: "",
  });

  useEffect(() => {
    focus.current.focus();
  }, []);

  const datahandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "contactNo") {
      value.length < 11 && value != "e"
        ? setData({ ...data, [name]: value })
        : void null;
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const submit = async () => {
    if (
      data.studentName != "" &&
      data.dateOfBirth != "" &&
      data.rollNo != "" &&
      data.className != ""
    ) {
      const sendData = await fetch("/api/addStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const res = await sendData.json();
      console.log(res);
    } else {
      alert("Please Fill All Required Fields");
    }
  };

  return (
    <>
      <div className={styles.card}>
        <label htmlFor="studentName">
          Student Name <span className={styles.astric}>*</span>
        </label>
        <input
          className={styles.input}
          type="text"
          name="studentName"
          id="studentName"
          ref={focus}
          value={data["studentName"]}
          onChange={datahandler}
        />
        <label htmlFor="fatherName">Father Name</label>
        <input
          className={styles.input}
          type="text"
          name="fatherName"
          id="fatherName"
          value={data["fatherName"]}
          onChange={datahandler}
        />
        <label htmlFor="motherName">Mother Name</label>
        <input
          className={styles.input}
          type="text"
          name="motherName"
          id="motherName"
          value={data["motherName"]}
          onChange={datahandler}
        />
        <label htmlFor="dateOfBirth">
          Date Of Birth <span className={styles.astric}>*</span>
        </label>
        <input
          className={styles.input}
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          value={data["dateOfBirth"]}
          onChange={datahandler}
        />
        <label htmlFor="rollNo">
          Roll No. <span className={styles.astric}>*</span>
        </label>
        <input
          className={styles.input}
          type="text"
          name="rollNo"
          id="rollNo"
          value={data["rollNo"]}
          onChange={datahandler}
        />
        <label htmlFor="class">
          Class <span className={styles.astric}>*</span>
        </label>
        <input
          className={styles.input}
          type="number"
          name="className"
          id="class"
          value={data["className"]}
          onChange={datahandler}
          onKeyDown={(e) => {
            e.keyCode === 69 || e.keyCode === 189 ? e.preventDefault() : "";
          }}
        />
        <label htmlFor="contactNo">Contact No.</label>
        <input
          className={styles.input}
          type="number"
          name="contactNo"
          id="contactNo"
          value={data["contactNo"]}
          onChange={datahandler}
          onKeyDown={(e) => {
            e.keyCode === 69 || e.keyCode === 189 ? e.preventDefault() : "";
          }}
        />

        <button onClick={submit} className={styles.addBtn}>
          Add Student
        </button>
      </div>
    </>
  );
}

export default addStudents;
