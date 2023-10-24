"use client";
// import { useQuery } from "@tanstack/react-query";
import Link from "../../node_modules/next/link";
import FormularioLOGIN from "./component/FormularioLOGIN";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";
import { IniciarSesion } from "./api/FuncionesConsultasAPI";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export default function Home() {
  const [id, setId] = useState<string>();

  const addIniciarSesion = useMutation({
    mutationFn: IniciarSesion,
    onSuccess: () => {
      toast.dismiss(id)
      toast.success("Successful login")
    },
    onError: () => {
      toast.dismiss(id)
      toast.error("Invalid User")
    },
  })
  useEffect(() => {
    if (addIniciarSesion.isPending) {
      setId(toast.loading("Cargando..."))
    }
  }, [addIniciarSesion.isPending])

  return (
    <div className=" w-[400px] min-h-[300px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white p-[30px]  ">
      <FormularioLOGIN
        Datos={(data) => addIniciarSesion.mutate({ body: data })}
      />
      
      <Link href={'/auth/crear-usuario'} >
        <Button 
          color="secondary"
          className="text-[#808080] text-[19px] font-bold mt-[20px]">
          or, sign up
        </Button>
      </Link>
    </div>
  )
}
