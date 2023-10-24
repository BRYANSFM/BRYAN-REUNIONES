'use client'
import TextField from "@mui/material/TextField";
import { useForm, } from 'react-hook-form';
import Button from '@mui/material/Button';

export const FormularioSIGNUP = ({ Datos }: { Datos: (event: {}) => any }) => {
  const ClaseInput = ' p-[15px] h-[30px] w-full rounded-[5px] outline outline-[2px] outline-gray-300 placeholder:text-slate-600 focus:outline-lime-400 focus:outline-[2px]'
  const ClaseSpan = "text-[red] text-[15px] block"
  const {
    register,
    handleSubmit,
    formState: { errors, },
    watch,
    setValue,
    reset,
  } = useForm();
  console.log(errors);



  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-dec underline underline-offset-2 text-[50px]"> Sign up </h1>
      </div>
      <Button />
      <form className='' onSubmit={handleSubmit(Datos)}>

      <TextField
          margin="dense"  
          fullWidth
          label="Firstname" 
          type='text'
          error={errors?.firstname ? true : false} 
          helperText={errors.firstname && errors.firstname.message} 
          color="success"
          size='small'
          {...register('firstname', {
            required: {
              value: true,
              message: 'Firstname is required',
            },
            minLength: {
              value: 2,
              message: 'Must be at least 2 characters',
            },
            maxLength: {
              value: 10,
              message: 'Must have a maximum of 10 characters',
            },
          })}
        />


        {/* Lastname */}
        <TextField
          margin="dense"  
          fullWidth
          label="Lastname" 
          type='text'
          error={errors?.lastname ? true : false} 
          helperText={errors.lastname && errors.lastname.message} 
          color="success"
          size='small'
          {...register('lastname', {
            required: {
              value: true,
              message: 'Lastname is required',
            },
          })}
        />


        {/* Email */}
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

        {/* Password */}
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
        {/* PasswordConfirmation */}
        <TextField
          margin="dense"  
          fullWidth
          label="Password Confirmation" 
          type='password'
          error={errors?.passwordConfirmation ? true : false} 
          helperText={errors.passwordConfirmation && errors.passwordConfirmation.message } 
          color="success"
          size='small'
          {...register('passwordConfirmation',{
            required: {
              value: true,
              message: 'Password is required',
            },
            validate: (value) =>  value === watch('password')|| 'It must be the same as the password',
          })}
        /> 
        {/* Position */}
        <TextField
          margin="dense"  
          fullWidth
          label="Position" 
          type='text'
          error={errors?.position ? true : false} 
          helperText={errors.position && errors.position.message} 
          color="success"
          size='small'
          {...register('position', {
            required: {
              value: true,
              message: 'Position is required',
            },
          })}
        />
        {/* Institution */}
        <TextField
          margin="dense"  
          fullWidth
          label="Institution" 
          type='text'
          error={errors?.institution ? true : false} 
          helperText={errors.institution && errors.institution.message} 
          color="success"
          size='small'
          {...register('institution', {
            required: {
              value: true,
              message: 'Institution is required',
            },
          })}
        />
        <Button 
          variant="contained"
           color="success"
           type="submit"
           className=" mt-[10px] p-2 text-[23px] text-green-600 w-full h-[50px] flex justify-center items-center">
          Sign up
        </Button>
      </form>
    </>
  )
}
