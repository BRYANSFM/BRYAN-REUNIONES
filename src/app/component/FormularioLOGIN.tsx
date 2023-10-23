import { useForm,  } from 'react-hook-form';

const FormularioLOGIN = ({ Datos} : {Datos: (event: any) => any}) => {
  const ClaseInput = '   p-[15px] h-[30px] w-full rounded-[5px] outline outline-[2px] outline-gray-300 placeholder:text-slate-600 focus:outline-lime-400 focus:outline-[2px]'
  const ClaseSpan = "text-[red] text-[15px] block"
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm();

  return (
    <>
      <div className="">
        <h1 className="font-bold text-dec underline underline-offset-2 text-[50px]"> Log in </h1>
      </div>
      <form className='' onSubmit={handleSubmit(Datos)}>
        <label  className="font-bold underline underline-offset-2   "> 
          Correo
        </label>
        <input 
          className={ClaseInput}
          type="email"
          placeholder='Correo'
          {...register('email', {
            required: {
              value: true,
              message: 'Correo es requerido',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Corrreo no valido',
            },
          })}
        />
        {errors.email && <span className={ClaseSpan}>{errors.email.message}</span>}

        <label className="font-bold underline underline-offset-2 "> 
          Contraseña
        </label>
        <input 
          className={ClaseInput}
          type="password"
          placeholder='Username'
          {...register('password',{
            required: {
              value: true,
              message: 'Contraseña requerida',
            }
          })}
        />
         {errors.password && <span className={ClaseSpan}>{errors.password.message}</span>}
        <button 
        className="  mt-[10px] hover:bg-[#083f48] bg-[#17b1c8] p-2 text-white  text-[23px] w-full h-[50px] rounded-[5px] flex justify-center items-center">Log in
      </button>
      </form>
    </>
  )
}

export default FormularioLOGIN