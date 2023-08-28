import "@/styles/globals.css";
import Home from "@/component/Home";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Home />
      <Component {...pageProps} />
    </>
  );
}
