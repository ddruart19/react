import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../globals.css'
import { Layouts } from '../src/Components/Layouts';
import { MyAppProps } from "../src/Components/types";
const queryClient = new QueryClient();


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: MyAppProps) {
    const Layout = Layouts[Component.Layout] ?? ((page) => page)
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    )
  }