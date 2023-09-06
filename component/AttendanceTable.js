import { useEffect, useState } from "react";
import Styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Table = Styled.table`
    margin: auto;
    font-size: 15px;
    font-weight: bold;
    border-collapse: collapse;
    text-align: center;
`;

const Th = Styled.th`
    border: solid 1px black;
    padding: 5px;
    background-color: #ab3ffd;
    box-shadow: inset 5px 5px 10px #9102fe;;
    color: white;
`;

const Td = Styled.td`
    border: solid 1px black;
    padding: 3px;
    background-color: white;
`;

const Select = Styled.select`
    width: 100px;
    height: 25px;
    text-align: center;
    border-radius: 15px;
    border: solid 1px #9102fe;
    background-color: white;
    &:focus {
      border: solid 2px blueviolet;
      box-shadow: 0px 0px 5px blueviolet;
    }
`;

const Btn = Styled.button`
color: white;
font-size: 13px;
background-color: blueviolet;
border: solid 1px black;
border-radius: 15px;
width: 70px;
height: 25px;
margin-top: 17px;
margin-left: 10px;
`;

function AttendanceTable({ rollNo }) {
  console.log("child")
  const [days, setDays] = useState([
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
  ]);
  const [months, setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [apiData, setApiData] = useState([]);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [year, setYear] = useState([]);
  const [timeData, setTimeData] = useState({
    month:
      (new Date().getMonth() + 1).toString().length < 2
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [countPA, setCountPA] = useState({
    p: "",
    a: "",
  });

  const noDays = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  };

  const day = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const timeDataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTimeData({ ...timeData, [name]: value });
  };

  const fetchData = async () => {
    
    const dateFrom = `${timeData.year}-${timeData.month}-01`;
    const dateTo = `${timeData.year}-${timeData.month}-${noDays()}`;

    const sendData = await fetch("/api/attendanceData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rollNo, dateFrom, dateTo }),
    });
    const res = await sendData.json();
    res.forEach((e) => {
      setApiData((pre) => {
        let newArrary = [...pre];
        newArrary.push({
          date: e.newDate,
          status: e.attendance,
        });
        return newArrary;
      });
    });
  };

  const createDates = () => {
    const start = day();
    const stop = noDays();
    let loop = 5;
    if (start > 5) loop = 6;
    let daysArray = [];
    let no = 1;
    let count = 1;
    for (let x = 0; x < loop; x++) {
      let dayArray = [];
      for (let y = 0; y < 7; y++) {
        if (count >= start && no <= stop) {
          dayArray.push(no);
          no += 1;
          count += 1;
        } else {
          dayArray.push("");
          count += 1;
        }
      }
      daysArray.push(dayArray);
    }
    setDates(daysArray);

    let statusArray = [];
    let sNo = 1;
    let sCount = 1;

    for (let x = 0; x < loop; x++) {
      let subArray = [];
      for (let y = 0; y < 7; y++) {
        if (sCount >= start && sNo <= stop) {
          let cheker = true;
          for (let z = 0; z < apiData.length; z++) {
            if (+apiData[z].date.split("-")[2] === +sNo) {
              subArray.push(apiData[z].status);
              cheker = false;
            }
          }
          if (cheker) subArray.push("");
          sNo += 1;
          sCount += 1;
        } else {
          subArray.push("");
          sCount += 1;
        }
      }
      statusArray.push(subArray);
    }
    setData(statusArray);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    let years = [currentYear];
    for (let x = 1; x < 11; x++) {
      years.push(+currentYear - +x);
    }
    setYear(years);
    if (rollNo) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    createDates();

    let p = 0;
    let a = 0;

    for (let x = 0; x < apiData.length; x++) {
      if (apiData[x].status === "P") {
        p += 1;
      } else if (apiData[x].status === "A") {
        a += 1;
      }
    }

    setCountPA({ p, a });
  }, [apiData]);

  const checkHandler = () => {
    setApiData([]);
    fetchData();
  };

  return (
    <>
      <table style={{ margin: "auto" }}>
        <tbody>
          <tr>
            <td>Presents:-</td>
            <td>{countPA.p}</td>
            <td>Absents:-</td>
            <td>{countPA.a}</td>
          </tr>
        </tbody>
      </table>
      <hr />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <label>Select Year</label>
          <Select name="year" value={timeData.year} onChange={timeDataHandler}>
            {year.map((x, i) => {
              return (
                <option value={x} key={i}>
                  {x}
                </option>
              );
            })}
          </Select>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <label>Select month</label>
          <Select
            name="month"
            value={timeData.month}
            onChange={timeDataHandler}
          >
            {months.map((x, i) => {
              return (
                <option
                  value={(+i + 1).toString().length < 2 ? `0${+i + 1}` : +i + 1}
                  key={i}
                >
                  {x}
                </option>
              );
            })}
          </Select>
        </div>
        <Btn onClick={checkHandler}>Check</Btn>
      </div>
      <hr />

      <Table>
        <thead>
          <tr>
            {days.map((x, i) => (
              <Th key={i}>{x}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dates.map((x, a) => {
            return (
              <tr key={a}>
                {x.map((y, i) => {
                  return (
                    <Td
                      key={i}
                      style={{
                        backgroundColor:
                          data[a][i] === "P"
                            ? "rgb(1, 182, 1)"
                            : data[a][i] === "A"
                            ? "rgb(200, 3, 3)"
                            : "",
                        color: data[a][i] != "" ? "white" : "black",
                      }}
                    >
                      {y}
                    </Td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <div style={{ width: "300px", margin: "auto" }}>
        <Doughnut
          data={{
            labels: ["Present", "Absent", "NA"],
            datasets: [
              {
                label: "Attendance",
                data: [countPA.p, countPA.a, noDays()],
                backgroundColor: ["#02c436", "#cc0404", "#ccc8cc"],
                borderColor: ["#02c436", "#cc0404", "#ccc8cc"],
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export default AttendanceTable;
