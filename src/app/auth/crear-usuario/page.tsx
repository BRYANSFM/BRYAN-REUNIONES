'use client';
import Link from "next/link";
import { useRouter } from "../../../../node_modules/next/navigation";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useMutation, useQuery } from "@tanstack/react-query";
import { CrearCuenta } from "../../api/FuncionesConsultasAPI";
import { FormularioSIGNUP } from "../../component/FormularioSIGNUP";
import Button from '@mui/material/Button';

function CrearUsuario() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [id, setId] = useState<string>();

  const addCrearCuenta = useMutation({
    mutationFn: CrearCuenta,
    onSuccess: () => {
      toast.dismiss(id)
      router.push(`/auth/crear-usuario/${email}`)
    },
    onError: () => {
      toast.dismiss(id)
      toast.error("Error")
    },
  })
  useEffect(() => {
    if (addCrearCuenta.isPending) {
      setId(toast.loading("Loading..."))
    }
  }, [addCrearCuenta.isPending])

  return (
    <div className="w-[400px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center bg-white px-[40px] pb-[10px] pt-[5px] mb-[30px] ">

      <FormularioSIGNUP
        Datos={(data: any) => {
          console.log(data);
          setEmail(data.email)
          addCrearCuenta.mutate({ body: data })
        }}
      />
      <Link href={'/'}>
        <Button
          color="secondary"
          className="text-[#808080] mt-[10px] text-[19px] font-bold  text-center">
          return to login
        </Button>
      </Link>

    </div>
  )
}


export default CrearUsuario;