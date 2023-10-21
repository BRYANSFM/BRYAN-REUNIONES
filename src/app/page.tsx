"use client";
// import { useQuery } from "@tanstack/react-query";
import Link from "../../node_modules/next/link";
import Input from "./component/Input";
import Titulo from "./component/Titulo";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";
import { IniciarSesion } from "./api/FuncionesConsultasAPI";

export default function Home() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  
  const addIniciarSesion =  useMutation({
    mutationFn: IniciarSesion,
    onSuccess: () =>{ 
      toast.success("Fue Exitoso")
    },
    onError: () => {
      toast.error("hubo un error")
    },
  })
  
  return (
    <div className=" w-[500px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white p-[40px] gap-[20px]">
      <Titulo
        texto = "Log in"
        style={{
          textDecorationLine: "underline",
          textUnderlineOffset: "2px",
          fontWeight: 700,
          fontSize: "50px",
        }}
        />
      <Input
        tipoInput="email"
        onChange={(e)=> setInputUsername(e.target.value) }
        placeholder="Username"
        />
      <Input
        tipoInput="password"
        onChange={(e)=> setInputPassword(e.target.value) }
        placeholder="Password"
        />
      <button 
        onClick={() => addIniciarSesion.mutate({ email: inputUsername, password: inputPassword }) } 
        className=" hover:bg-[#083f48] bg-[#17b1c8] p-2 text-white  text-[23px] w-[420px] h-[55px] rounded-[5px] text-center">Log in
      </button>
      
      <Link  href = {'/auth/crear-usuario'} >
        <button className=" hover:text-black hover:underline hover:underline-offset-2 text-[#808080] text-[19px] font-bold  text-center ">or, sign up</button>
      </Link>
    </div>
  )
}
