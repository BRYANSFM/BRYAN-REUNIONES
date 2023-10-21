// import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

const ApiReuniones = axios.create({
  baseURL: 'https://reuniones-ogtic-api-f2ca1.develop.ogtic.gob.do/api'
})


type credenciales ={
  email: string, 
  password: string
}
export const IniciarSesion = async ({email, password} : credenciales) => {
  const res = await ApiReuniones.post('/auth/login',
    {
      email: email, 
      password: password,
    },
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      }
    }
  )
  return res.data
}

type Datos = {
  email: string, 
  position: string, 
  institution: string, 
  password: string, 
  firstname: string, 
  lastname: string,
}

export const CrearCuenta = async ({email, position, institution, password, firstname, lastname}: Datos) => {
  const res = await ApiReuniones.post('/users',
    {
      email: email,
      position: position,
      institution: institution, 
      password: password,
      passwordConfirmation: password,
      firstname: firstname,
      lastname: lastname,
    },
    {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      }
    }
  )
  return res.data
}

export const ValidarUsuario = async ({autenticar, codigo}: {autenticar: any, codigo: string}) => {
  const res = await axios.get(
    `https://reuniones-ogtic-api-f2ca1.develop.ogtic.gob.do/api/auth/validate-user?code=${codigo}&email=${autenticar}`,
    {
      headers: {
        Accept: "*/*",
      },
    }
  );
  return res.data
}

