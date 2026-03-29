if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
    window.global = window;
}

import '../assets/styles.css';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...Component} {...pageProps} />
    </SessionProvider>
  )
}
