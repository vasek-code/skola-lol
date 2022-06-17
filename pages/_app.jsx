import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  });

  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
