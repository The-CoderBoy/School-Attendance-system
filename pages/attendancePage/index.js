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

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  console.log(query);
  return {
    props: {
      data: "hello",
    },
  };
}