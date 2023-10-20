'use client';
import { useRouter } from "../../../../node_modules/next/navigation";
import Input from "@/app/component/Input";
import Titulo from "@/app/component/Titulo";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type credenciales = { 
  email: string,
  position: string,
  institution: string, 
  password: string,
  firstname: string,
  lastname: string,
}

function CrearUsuario() {
  const router = useRouter();

  const [email,setEmail] = useState("");
  const [position,setPosition] = useState("");
  const [institution,setInstitution] = useState("");
  const [password,setPassword] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");

  async function CrearCuenta({email, position, institution, password, firstname, lastname}: credenciales) {
    const id = toast.loading("Cargando por favor espere");

    const promesaFetch = await fetch(
      'https://reuniones-ogtic-api-f2ca1.develop.ogtic.gob.do/api/users',
      {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          position: position,
          institution: institution, 
          password: password,
          passwordConfirmation: password,
          firstname: firstname,
          lastname: lastname,
        }),
      }
    );

    const json = await promesaFetch.json();
    toast.dismiss(id);

    json?.message ? 
    toast.error(
    <h1 className="text-[red] font-bold">
      Debe llenar todos los campos o verifique los datos introducidos
    </h1>)
    : 
    // toast.success("hola")
    router.push(`/auth/crear-usuario/${email}`)

    return json;
  }

  return (
    <div className=" w-[500px] min-h-[350px] shadow-3xl rounded-[20px] flex flex-col items-center justify-center   bg-white px-[40px] pb-[30px] pt-[10px] gap-[10px]">
      <Titulo
        texto = "Sign up"
        style={{
          textDecorationLine: "underline",
          textUnderlineOffset: "2px",
          fontSize: "40px",
        }}
      />
      <Titulo
        texto = "Nombre"
        style={{
          fontSize: "15px",
        }}
      />
      <Input
        tipoInput="text"
        onChange={(e)=> setFirstname(e.target.value) }
        placeholder="Nombre"
      />
      <Titulo
        texto = "Apellido"
        style={{
          fontSize: "15px",
        }}
      />
      <Input
        tipoInput="text"
        onChange={(e)=> setLastname(e.target.value) }
        placeholder="Apellido"
      />
      <Titulo
        texto = "Correo"
        style={{
          fontSize: "15px",
        }}
      />
      <Input
        tipoInput="email"
        onChange={(e)=> setEmail(e.target.value) }
        placeholder="Correo Electronico"
      />
      <Titulo
        texto = "Contraseña"
        style={{
          fontSize: "15px",
        }}
      />
      <Input
        tipoInput="password"
        onChange={(e)=> setPassword(e.target.value) }
        placeholder="Contraseña"
      />
      <Titulo
        texto = "Posicion"
        style={{
          fontSize: "15px",
        }}
      />
      <Input
        tipoInput="text"
        onChange={(e)=> setPosition(e.target.value) }
        placeholder="Posición en la Institucion"
      />
      <Titulo
        texto = "Institución"
        style={{
          fontSize: "15px",
        }}
      />
      <Input
        tipoInput="text"
        onChange={(e)=> setInstitution(e.target.value) }
        placeholder="Institucion"
      />
      <button 
        onClick={
          async function () {
            await CrearCuenta({ 
              email: email,
              position: position,
              institution: institution, 
              password: password,
              firstname: firstname,
              lastname: lastname,
            })  
          }
        }
        className=" mt-[5px] hover:bg-gradient-to-l hover:from-[red]  hover:to-[#9b9bb4] bg-gradient-to-l from-red-400 to-yellow-300 p-2 text-white  text-[23px] w-[420px] h-[55px] rounded-[5px] text-center">
          Sign up
      </button>
    </div> 
  )
}


export default CrearUsuario;