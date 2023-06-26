import { Html, Head, Main, NextScript } from 'next/document';
import CustomHead from '@/layout/custom-head';
import CustomScript from '@/layout/custom-script';

export default function Document() {
  return (
    <Html>
      <Head />
      <CustomHead />
      <body>
        <Main />
        <NextScript />
        <CustomScript />
      </body>
    </Html>
  );
}
