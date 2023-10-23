'use client';
import { useRouter } from "../../../../node_modules/next/navigation";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";
import { CrearCuenta } from "../../api/FuncionesConsultasAPI";
import {FormularioSIGNUP} from "../../component/FormularioSIGNUP";

function CrearUsuario() {
  const router = useRouter();

  const [email,setEmail] = useState('');
  const[id, setId] = useState<string>();

  const addCrearCuenta =  useMutation({
    mutationFn: CrearCuenta,
    onSuccess: () =>{ 
      toast.dismiss(id)
      router.push(`/auth/crear-usuario/${email}`)
    },
    onError: () => {
      toast.dismiss(id)
      toast.error("hubo un error")
    },
  })
  useEffect(()=> {
    if(addCrearCuenta.isPending){
      setId(toast.loading("Cargando..."))
    }
  },[addCrearCuenta.isPending] )

  return (
    <div className="w-[400px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white px-[40px] pb-[40px] pt-[5px] gap-[20px]">
      
      <FormularioSIGNUP
        Datos = {(data) => {
          console.log(data);
          setEmail(data.email)
          addCrearCuenta.mutate({ body: data })
        }}
      />
      
    </div> 
  )
}


export default CrearUsuario;