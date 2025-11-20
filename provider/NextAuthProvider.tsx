"use client"
import React from 'react'
import { SessionProvider } from 'next-auth/react';

interface props{
    children?:React.ReactNode;
}

export default function NextAuthProvider({children}:props) {
  return <SessionProvider>{children}</SessionProvider>
}


