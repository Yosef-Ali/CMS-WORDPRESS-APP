import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";

<<<<<<< HEAD
export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
=======
export default function Layout({ preview, children }) {
	return (
		<>
			<Meta />
			<Header />
			<div className='min-h-screen'>
				{/* <Alert preview={preview} /> */}
				<main>{children}</main>
			</div>
			<Footer />
		</>
	);
>>>>>>> aa39fc7f3381656a14f872abda7274d19778faf0
}
