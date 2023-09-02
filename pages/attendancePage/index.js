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

  return (
    <div>
      {!sList ? (
        <MarkAttendence
          list={sListHandler}
          date={parameter.date}
          className={parameter.className}
        />
      ) : (
        <StudentList
          list={sListHandler}
          date={parameter.date}
          className={parameter.className}
        />
      )}
    </div>
  );
}

export default index;

// export async function getServerSideProps(context) {
//   const { params, req, res, query } = context;
//   const { className, date } = query;
//   console.log(query);
//   const client = new Client({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//   });
//   try {
//     await client.connect();
//     const data = await client.query(
//       `select * from studentInfo
//         left join attendance on studentInfo."rollNo" = attendance."rollNo"
//         where studentInfo."className"=${className} order by studentInfo."studentName" asc`
//     );
//     await client.end();
//     return {
//       props: {
//         data: JSON.parse(JSON.stringify(data.rows)),
//         date,
//         className,
//       },
//     };
//   } catch {
//     await client.end();
//     return {
//       props: {
//         data: [],
//         date,
//         className,
//       },
//     };
//   }
// }
