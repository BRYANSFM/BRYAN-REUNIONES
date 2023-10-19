"use client";
import {QueryClient, QueryClientProvider} from "react-query"

const queryclient = new QueryClient();

export const ReactQueryProvider = ({ children }: {children: React.ReactNode}) => {

  return(
    <QueryClientProvider client={queryclient}> {children} </QueryClientProvider>
  ) 
}