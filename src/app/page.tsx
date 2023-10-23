"use client";
// import { useQuery } from "@tanstack/react-query";
import Link from "../../node_modules/next/link";
import FormularioLOGIN from "./component/FormularioLOGIN";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";
import { IniciarSesion } from "./api/FuncionesConsultasAPI";

export default function Home() {
  const[id, setId] = useState<string>();
  
  const addIniciarSesion =  useMutation({
    mutationFn: IniciarSesion,
    onSuccess: () =>{ 
      toast.dismiss(id)
      toast.success("Fue Exitoso")
    },
    onError: () => {
      toast.dismiss(id)
      toast.error("hubo un error")
    },
  })
  useEffect(()=> {
    if(addIniciarSesion.isPending){
      setId(toast.loading("Cargando..."))
    }
  },[addIniciarSesion.isPending] )
  
  return (
    <div className=" w-[400px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white p-[40px] gap-[20px]">
      <FormularioLOGIN
        Datos = {(data) => addIniciarSesion.mutate({ body: data})}
      />
      <Link  href = {'/auth/crear-usuario'} >
        <button className=" hover:text-black hover:underline hover:underline-offset-2 text-[#808080] text-[19px] font-bold  text-center ">or, sign up</button>
      </Link>
    </div>
  )
}
