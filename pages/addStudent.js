import styles from "@/styles/addStudent.module.css";
import { useState } from "react";

function addStudents() {
  const [data, setData] = useState({
    "Student Name": "",
    "Father Name": "",
    "Mother Name": "",
    "Date Of Birth": "",
    "Roll No": "",
    Class: "",
    "Contact No": "",
  });

  const datahandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "Contact No") {
      value.length < 11 && value != "e"
        ? setData({ ...data, [name]: value })
        : void null;
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const submit = () => {
    console.log(data);
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
          name="Student Name"
          id="studentName"
          value={data["Student Name"]}
          onChange={datahandler}
        />
        <label htmlFor="fatherName">Father Name</label>
        <input
          className={styles.input}
          type="text"
          name="Father Name"
          id="fatherName"
          value={data["Father Name"]}
          onChange={datahandler}
        />
        <label htmlFor="motherName">Mother Name</label>
        <input
          className={styles.input}
          type="text"
          name="Mother Name"
          id="motherName"
          value={data["Mother Name"]}
          onChange={datahandler}
        />
        <label htmlFor="dateOfBirth">
          Date Of Birth <span className={styles.astric}>*</span>
        </label>
        <input
          className={styles.input}
          type="date"
          name="Date Of Birth"
          id="dateOfBirth"
          value={data["Date Of Birth"]}
          onChange={datahandler}
        />
        <label htmlFor="rollNo">
          Roll No. <span className={styles.astric}>*</span>
        </label>
        <input
          className={styles.input}
          type="text"
          name="Roll No"
          id="rollNo"
          value={data["Roll No"]}
          onChange={datahandler}
        />
        <label htmlFor="class">
          Class <span className={styles.astric}>*</span>
        </label>
        <input
          className={styles.input}
          type="text"
          name="Class"
          id="class"
          value={data["Class"]}
          onChange={datahandler}
        />
        <label htmlFor="contactNo">Contact No.</label>
        <input
          className={styles.input}
          type="number"
          name="Contact No"
          id="contactNo"
          value={data["Contact No"]}
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
