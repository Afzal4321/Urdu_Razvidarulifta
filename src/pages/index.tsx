import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Layout from "@/components/layouts/Layout";
import Home from "@/components/Home/home";



export default function Index() {
  return (
    <>

      <>
        <Layout>
          <Home />
        </Layout>
      </>
    </>
  );
}
