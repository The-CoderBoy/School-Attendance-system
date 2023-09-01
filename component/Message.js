import Styled from "styled-components";

const Card = Styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 250px;
    background-color: white;
    box-shadow: 0px 0px 12px #35025c46;
    padding: 5px;
    text-align: center;
    color:  ${(props) => (props.color ? "rgb(2, 106, 2)" : "rgb(169, 3, 3)")};
`;

const Btn = Styled.button`
    border: 1px solid #35025c;
    height: 30px;
    width: 60px;
    color: white;
    background-color: #6f359bef;
    margin-bottom: 10px;
`;

function Message({ hide, color }) {
  return (
    <Card color={color}>
      <p>
        {" "}
        {color
          ? "Student Information Saved Successfully"
          : "Error Somthing Went Worng"}{" "}
      </p>
      <Btn onClick={() => hide()}>Close</Btn>
    </Card>
  );
}

export default Message;
