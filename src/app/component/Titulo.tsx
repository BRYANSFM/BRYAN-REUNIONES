import { CSSProperties } from "react"

type Estilos = { 
  style : CSSProperties
  texto : string,
}

const Input = ({ style, texto } :Estilos) => {

  return (
    <div className=" w-full flex justify-start items-center">
      <h1 style={style} className="font-bold" > {texto}</h1>
    </div>
  )
}

export default Input