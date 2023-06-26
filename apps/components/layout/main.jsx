import Header from '@/layout/header';
import Footer from '@/layout/footer';
import { ToastContainer } from 'react-toastify';

function Main(props) {
  return (
    <>
      <Header />
      <div className="container my-3">{props.children}</div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Main;
