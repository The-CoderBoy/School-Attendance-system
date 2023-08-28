import React from "react";
import Styled from "styled-components";
import { useRouter } from "next/router";

const Button = Styled.button`
  width: 250px;
  height: 50px;
  margin-top: 30px;
  border-radius: 15px;
  font-size: 18px;
  border: solid 3px #9102fe;
  background: rgb(129,1,143);
  background: linear-gradient(180deg, 
              rgba(129,1,143,0.938813025210084) 0%, 
              rgba(145,2,254,0.8939950980392157) 46%, 
              rgba(174,70,252,0.9612219887955182) 65%);
  color: white;
`;

function index() {
  const router = useRouter();

  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <div>
        <Button
          onClick={() => {
            router.push("/selectClass");
          }}
        >
          Take Attendance
        </Button>
      </div>

      <div>
        <Button
          onClick={() => {
            router.push("/viewAttendence");
          }}
        >
          View Attendance
        </Button>
      </div>

      <div>
        <Button
          onClick={() => {
            router.push("/addStudent");
          }}
        >
          Add Student
        </Button>
      </div>
    </div>
  );
}

export default index;
