// import { useEffect } from 'react';
import Layout from '@/layout/main';
import { Poppins } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--poppins-font',
});

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   import('bootstrap/dist/js/bootstrap');
  // }, []);

  return (
    <Layout>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
