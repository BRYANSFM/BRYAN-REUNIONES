"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { ValidarUsuario } from "@/app/api/FuncionesConsultasAPI";
import { useQuery, useMutation } from '@tanstack/react-query'
import { useForm} from 'react-hook-form';


function Autenticar() {
  const router = useRouter();
  const { autenticar } = useParams();
  const[codigo, setCodigo] = useState("");
  const[id, setId] = useState<string>('');
  const ClaseInput = ' p-[15px] h-[30px] w-full rounded-[5px] outline outline-[2px] outline-gray-300 placeholder:text-slate-600 focus:outline-lime-400 focus:outline-[2px]'
  const ClaseSpan = "text-[red] text-[15px] block"

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  const addAutenticar =  useMutation({
    mutationFn: ValidarUsuario,
    onSuccess: () =>{ 
      toast.dismiss(id)
      router.push('/')
    },
    onError: () => {
      toast.dismiss(id)
      toast.error("hubo un error")
    },
  })
  useEffect(()=> {
    if(addAutenticar.isPending){
      setId(toast.loading("Cargando..."))
    }
  },[addAutenticar.isPending] )

  return (
    <div className=" w-[600px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white px-[40px] pb-[10px] pt-[10px] gap-[10px]" >
     <h1 className=" text-[39px] font-bold underline underline-offset-[3px]">
        Account authentication
      </h1>
     <h1 className=" text-[20px] font-bold text-green-600 text-center">
        For security, a code was sent to your email to verify your identity.
     </h1>
      <form className=" flex flex-col items-center justify-center " onSubmit={handleSubmit((data)=> {
        console.log(data.code)
        addAutenticar.mutate({autenticar: autenticar, codigo: data.code})
      })}>
        <input 
          className={ClaseInput} 
          type="text"
          placeholder="Verification code" 
          {...register('code', {
            required: {
              value: true,
              message: 'Code is required'
            },
            pattern: {
              value: /^\d{6}$/,
              message: 'Must be 6 numbers'
            }
          })}
        />
        {errors.code && <span className={ClaseSpan}>{errors.code.message}</span>}
        <button
          className=" mt-[10px] hover:bg-gradient-to-l hover:from-[red]  hover:to-[#9b9bb4] bg-gradient-to-l from-red-400 to-yellow-300 p-2 text-white  text-[23px] w-[420px] h-[55px] rounded-[5px] text-center">
          Validate
        </button> 
      </form>

    </div>
  )
}

export default Autenticar;