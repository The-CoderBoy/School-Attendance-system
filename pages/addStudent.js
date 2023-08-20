import styles from "@/styles/addStudent.module.css";

function addStudents() {
  return (
    <>
      <div className={styles.card}>
        <label htmlFor="studentName">Student Name</label>
        <input
          className={styles.input}
          type="text"
          name="studentName"
          id="studentName"
        />
        <label htmlFor="fatherName">Father Name</label>
        <input
          className={styles.input}
          type="text"
          name="fatherName"
          id="fatherName"
        />
        <label htmlFor="motherName">Mother Name</label>
        <input
          className={styles.input}
          type="text"
          name="motherName"
          id="motherName"
        />
        <label htmlFor="dateOfBirth">Date Of Birth</label>
        <input
          className={styles.input}
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
        />
        <label htmlFor="rollNo">Roll No.</label>
        <input className={styles.input} type="text" name="rollNo" id="rollNo" />
        <label htmlFor="contactNo">Contact No.</label>
        <input
          className={styles.input}
          type="number"
          name="contactNo"
          id="contactNo"
        />

        <button  className={styles.addBtn}>Add Student</button>
      </div>
    </>
  );
}

export default addStudents;
