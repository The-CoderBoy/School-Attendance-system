import MarkAttendence from "@/component/MarkAttendence";
import StudentList from "@/component/StudentList";
import { useState } from "react";

function index() {
  const [sList, setSList] = useState(false);
  const sListHandler = () => {
    setSList(!sList);
  };
  return <div>{!sList ? <MarkAttendence list={sListHandler} /> : <StudentList list={sListHandler}/>}</div>;
}

export default index;
