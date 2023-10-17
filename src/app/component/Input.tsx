

type Props = { 
  placeholder: string, 
  onChange: (event: any) => any, 
  tipoInput: string 
}

const Input = ({placeholder, onChange, tipoInput} :Props) => {

  return (
    <input 
      className="p-[15px] h-[50px] w-full rounded-[5px] outline outline-[2px] outline-gray-300 placeholder:text-slate-600 focus:outline-lime-400 focus:outline-[2px]"
      placeholder= {placeholder}
      type={tipoInput}
      onChange={onChange} 
    />
  )
}

export default Input