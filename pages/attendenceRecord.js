import { useEffect, useState } from "react";
import Styled from "styled-components";

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
`;

const apiData = [
  {
    date: "2023-8-1",
    status: "P",
  },
  {
    date: "2023-8-2",
    status: "P",
  },
  {
    date: "2023-8-3",
    status: "A",
  },
];

function attendenceRecord() {
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
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);

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

  useEffect(() => {
    const start = day();
    const stop = noDays();
    let daysArray = [];
    let no = 1;
    let count = 1;
    for (let x = 0; x < 5; x++) {
      let dayArray = [];
      for (let y = 0; y < 7; y++) {
        if (count >= start && count <= stop + 1) {
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

    for (let x = 0; x < 5; x++) {
      let subArray = [];
      for (let y = 0; y < 7; y++) {
        if (sCount >= start && sCount <= stop + 1) {
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
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", textAlign:"center" }}>
        <div>
          <label>Select Year</label>
          <Select>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </Select>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <label>Select month</label>
          <Select>
            {months.map((x, i) => {
              return (
                <option value={x} key={i}>
                  {x}
                </option>
              );
            })}
          </Select>
        </div>
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
    </>
  );
}

export default attendenceRecord;
