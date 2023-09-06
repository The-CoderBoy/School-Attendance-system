import MarkAttendence from "@/component/MarkAttendence";
import StudentList from "@/component/StudentList";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { Client } from "pg";

function index() {
  const [sList, setSList] = useState(false);
  const [parameter, setParameter] = useState({
    className: "",
    date: "",
  });
  const [stuIndex, setStuIndex] = useState("");
  const router = useRouter();
  const sListHandler = () => {
    setSList(!sList);
  };
  useEffect(() => {
    const { className, date } = router.query;
    if (className && className !== "" && date && date !== "") {
      setParameter({ ...parameter, className, date });
    }
  }, [router]);

  const selectStuIndex = (x) => {
    setSList(false)
    setStuIndex(x);
  };

  return (
    <div>
      {!sList ? (
        <MarkAttendence
          list={sListHandler}
          date={parameter.date}
          className={parameter.className}
          stuIndex={stuIndex}
          selectStuIndex={selectStuIndex}
        />
      ) : (
        <StudentList
          list={sListHandler}
          date={parameter.date}
          className={parameter.className}
          selectStuIndex={selectStuIndex}
        />
      )}
    </div>
  );
}

export default index;
