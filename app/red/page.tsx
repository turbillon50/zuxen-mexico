"use client";
import { NetworkTree } from "@/components/NetworkTree";
import { useTheme } from "@/components/ThemeProvider";
export default function RedPage(){
  const {theme}=useTheme();
  return <NetworkTree isDark={theme==="dark"}/>
}
