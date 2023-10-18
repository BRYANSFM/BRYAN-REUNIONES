"use client";
import { useParams } from "next/navigation";
import Input from "@/app/component/Input";
import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

type credenciales = { 
  autenticar: any,
  codigo: string,
}

function Autenticar() {
  const router = useRouter();

  const { autenticar } = useParams();
  const[codigo, setCodigo] = useState("");

  async function ValidarUsuario({autenticar, codigo}: credenciales) {
    const id = toast.loading("Cargando por favor espere");

    const promesaFetch = await fetch(
      `https://reuniones-ogtic-api-06594.develop.ogtic.gob.do/api/auth/validate-user?code=${codigo}&email=${autenticar}`,
      {
        method: 'GET',
        headers: {
          Accept: '*/*',
        },
      }
    );

    const json = await promesaFetch.json();
    toast.dismiss(id);

    json?.message ? 
    toast.error(
    <h1 className="text-[red] font-bold">
      ¡Invalido!
    </h1>)
    : router.push("/") 
    // toast.success("Validación satisfactoria")

    return json;
  }

  return (
    <div className=" w-[600px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white px-[40px] pb-[10px] pt-[10px] gap-[10px]" >
     <h1 className=" text-[39px] font-bold underline underline-offset-[3px]">
        Autenticacion de la cuenta
      </h1>
     <h1 className=" text-[20px] font-bold text-green-600 text-center">
        Por seguridad se le envio un codigo via su correo electronico para verificar su identidad
     </h1>
     <Input
        tipoInput="text"
        onChange={(e)=> setCodigo(e.target.value)}
        placeholder="Introduzca el codigo de verificación"
      />
      <button
        onClick={
          async function(){
            await ValidarUsuario({
              autenticar: autenticar,
              codigo: codigo,
            })
          }
        }
        className=" mt-[10px] hover:bg-gradient-to-l hover:from-[red]  hover:to-[#9b9bb4] bg-gradient-to-l from-red-400 to-yellow-300 p-2 text-white  text-[23px] w-[420px] h-[55px] rounded-[5px] text-center">
       Validar
      </button>

    </div>
  )
}

export default Autenticar;