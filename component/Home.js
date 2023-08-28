 import { AiOutlineHome } from "react-icons/ai";
 import { useRouter } from "next/router";

function Home() {
    const router = useRouter()
  return (
    <div style={{fontSize:"25px",color:"#9e4ddcef"}}>
        <AiOutlineHome onClick={()=>{
            router.push("/")
        }}/>
    </div>
  )
}

export default Home