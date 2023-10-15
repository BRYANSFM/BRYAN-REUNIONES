'use client';

import { useRouter } from "../../../../node_modules/next/navigation";

function CrearUsuario() {
  const router = useRouter();

  return (
    <div className=" ">
      <button className="bg-red-500 p-2 text-white m-2 rounded-lg" onClick={router.back}>dalepatra</button>
      Crear Usuario
    </div>
  )
}

export default CrearUsuario;