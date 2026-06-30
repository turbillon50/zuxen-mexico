"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme="dark"|"light";
const Ctx=createContext<{theme:Theme;toggle:()=>void}>({theme:"dark",toggle:()=>{}});
export const useTheme=()=>useContext(Ctx);

export function ThemeProvider({children}:{children:React.ReactNode}){
  const [theme,setTheme]=useState<Theme>("dark");
  useEffect(()=>{
    const saved=localStorage.getItem("zuxen-theme") as Theme|null;
    if(saved) setTheme(saved);
  },[]);
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",theme);
    localStorage.setItem("zuxen-theme",theme);
  },[theme]);
  return(
    <Ctx.Provider value={{theme,toggle:()=>setTheme(t=>t==="dark"?"light":"dark")}}>
      {children}
    </Ctx.Provider>
  );
}
