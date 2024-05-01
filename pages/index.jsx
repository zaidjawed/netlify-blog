import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nextlify Blog</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <div className="container">
        <h1>Welcome to Blogs</h1>
        <hr className="hr" />
        <Link href='/blog'>blogs</Link>
      </div>
    </>
  )
}