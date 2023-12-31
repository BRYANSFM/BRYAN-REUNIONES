"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { ValidarUsuario } from "@/app/api/FuncionesConsultasAPI";
import {  useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { PinInput, PinInputField, HStack } from '@chakra-ui/react'


function Autenticar() {
  const [code, setCode] = useState('')
  const router = useRouter();
  const { autenticar } = useParams();
  const [id, setId] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const addAutenticar = useMutation({
    mutationFn: ValidarUsuario,
    onSuccess: () => {
      toast.dismiss(id)
      router.push('/')
    },
    onError: () => {
      toast.dismiss(id)
      toast.error("Invalid code")
    },
  })
  useEffect(() => {
    if (addAutenticar.isPending) {
      setId(toast.loading("Loading..."))
    }
  }, [addAutenticar.isPending])

  return (
    <div className=" w-[600px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white px-[40px] pb-[10px] pt-[10px] gap-[10px]" >
      <h1 className=" text-[39px] font-bold underline underline-offset-[3px]">
        Autenticar Cuenta
      </h1>
      <h1 className=" text-[20px] font-bold text-green-600 text-center">
        Se envió un código a su correo electrónico para verificar su identidad.
      </h1>
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-3" >
          <PinInput 
            placeholder="#"
            onChange={value => setCode(value)}
          >
            <PinInputField className="w-[45px] h-[45px] rounded-[10px] text-center text-2xl font-bold  outline outline-4 outline-slate-300   focus:outline focus:outline-4 focus:outline-green-500"  />
            <PinInputField className="w-[45px] h-[45px] rounded-[10px] text-center text-2xl font-bold  outline outline-4 outline-slate-300 focus:outline focus:outline-4 focus:outline-green-500"/>
            <PinInputField className="w-[45px] h-[45px] rounded-[10px] text-center text-2xl font-bold  outline outline-4 outline-slate-300 focus:outline focus:outline-4 focus:outline-green-500"/>
            <PinInputField className="w-[45px] h-[45px] rounded-[10px] text-center text-2xl font-bold  outline outline-4 outline-slate-300 focus:outline focus:outline-4 focus:outline-green-500"/>
            <PinInputField className="w-[45px] h-[45px] rounded-[10px] text-center text-2xl font-bold  outline outline-4 outline-slate-300 focus:outline focus:outline-4 focus:outline-green-500"/>
            <PinInputField className="w-[45px] h-[45px] rounded-[10px] text-center text-2xl font-bold  outline outline-4 outline-slate-300 focus:outline focus:outline-4 focus:outline-green-500"/>
          </PinInput>  
        </div>

        <Button 
          variant="contained"
          color="success"
          type="submit"
          className=" text-green-600 mt-4 p-2 w-[211.5px] h-[55px] text-[23px]"
          onClick={()=> addAutenticar.mutate({ autenticar: autenticar, codigo: code })}
        >
          Validate
        </Button>
      </div>
    </div>
  )
}

export default Autenticar;