import styled from "@/styles/markAttendence.module.css";
import { BsPersonBoundingBox } from "react-icons/bs";

function MarkAttendence() {
  return (
    <>
      <div className={styled.mainBox}>
        <div className={styled.person}>
          <BsPersonBoundingBox />
        </div>

        <p className={styled.name}>Gotam Adani</p>
        <table className={styled.table}>
          <tbody>
            <tr>
              <td>Roll No</td>
              <td>420</td>
            </tr>
            <tr>
              <td>Contact No</td>
              <td>1234567890</td>
            </tr>
            <tr>
              <td>Date Of Birth</td>
              <td>01-01-1999</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "center", marginTop: "5%" }}>
        <button className={styled.present}>Present</button>
        <button className={styled.absent}>Absent</button>
      </div>
    </>
  );
}

export default MarkAttendence;
