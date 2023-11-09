import { useForm,  } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';


const FormularioLOGIN = ({ Datos} : {Datos: (event: any) => any}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues:{
      password: '',
      email: ''
    }
  });
  console.log(errors)

  return (
    <>
      <form  onSubmit={handleSubmit(Datos)}>
      <h1 className="font-bold text-dec underline underline-offset-2 text-[50px]"> Log in </h1>
        
        <TextField
          margin="dense"  
          fullWidth
          label="Email" 
          color="success"
          size='small'
          error={errors?.email ? true : false} 
          type='text'
          helperText={errors.email && errors.email.message} 
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