import { useForm,  } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


const FormularioLOGIN = ({ Datos} : {Datos: (event: any) => any}) => {
  const ClaseInput = '   p-[15px] h-[30px] w-full rounded-[5px] outline outline-[2px] outline-gray-300 placeholder:text-slate-600 focus:outline-lime-400 focus:outline-[2px]'
  const ClaseSpan = "text-[red] text-[15px] block"
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    reset,
  } = useForm();
  console.log(errors)

  return (
    <>
      <form  onSubmit={handleSubmit(Datos)}>
      <h1 className="font-bold text-dec underline underline-offset-2 text-[50px]"> Log in </h1>
        
        <TextField
          margin="dense"  
          fullWidth
          label="Email" 
          type='text'
          error={errors?.email ? true : false} 
          helperText={errors.email && errors.email.message} 
          color="success"
          size='small'
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email',
            },
          })}
        />

        <TextField
          margin="dense"  
          fullWidth
          label="Password" 
          type='password'
          error={errors?.password ? true : false} 
          helperText={errors.password && errors.password.message } 
          color="success"
          size='small'
          {...register('password',{
            required: {
              value: true,
              message: 'Password is required',
            }
          })}
        /> 
        <Button 
          color='success'
          variant='contained'
          fullWidth
          type='submit'
          className="p-2 text-green-600 h-[50px]  text-[25px] font-bold mt-[10px] flex justify-center items-center">
          Log in
        </Button>
      </form>
    </>
  )
}

export default FormularioLOGIN