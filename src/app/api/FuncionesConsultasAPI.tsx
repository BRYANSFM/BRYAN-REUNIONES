// import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'

const ApiReuniones = axios.create({
  baseURL: 'https://reuniones-ogtic-api-f2ca1.develop.ogtic.gob.do/api'
})



export const IniciarSesion = async ({body} : {body: {}}) => {
  const res = await ApiReuniones.post('/auth/login',body,
    {
      headers: { Accept: '*/*', 'Content-Type': 'application/json' }
    }
  )
  return res.data
}

export const CrearCuenta = async ({body} : {body: any}) => {
  const res = await ApiReuniones.post('/users',body,
    {
      headers: { Accept: '*/*', 'Content-Type': 'application/json'}
    }
  )
  return res.data
}

export const ValidarUsuario = async ({autenticar, codigo}: {autenticar: any, codigo: string}) => {
  const res = await axios.get(
    `https://reuniones-ogtic-api-f2ca1.develop.ogtic.gob.do/api/auth/validate-user?code=${codigo}&email=${autenticar}`,
    {
      headers: {Accept: "*/*"}
    }
  );
  return res.data
}

