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
        <h1 className="font-bold text-dec underline underline-offset-2 text-[50px]"> Registrarse </h1>
      </div>
      <Button />
      <form className='' onSubmit={handleSubmit(Datos)}>

        <TextField
          margin="dense"
          fullWidth
          label="Nombre"
          type='text'
          error={errors?.Nombre ? true : false}
          helperText={(errors.Nombre && errors.Nombre.message != undefined ) && errors.Nombre.message.toString()}
          color="success"
          size='small'
          {...register('Nombre', {
            required: {
              value: true,
              message: 'Nombre requerido',
            },
            minLength: {
              value: 2,
              message: 'Debe tener al menos 2 caracteres',
            },
            maxLength: {
              value: 10,
              message: 'Debe tener un máximo de 10 caracteres',
            },
          })}
        />


        {/* Apellido */}
        <TextField
          margin="dense"
          fullWidth
          label="Apellido"
          type='text'
          error={errors?.lastname ? true : false}
          helperText={(errors.lastname && errors.lastname.message != undefined ) && errors.lastname.message.toString()}
          color="success"
          size='small'
          {...register('lastname', {
            required: {
              value: true,
              message: 'Apellido es requerido',
            },
          })}
        />


        {/* Correo electrónico */}
        <TextField
          margin="dense"
          fullWidth
          label="Correo electrónico"
          type='text'
          error={errors?.email ? true : false}
          helperText={(errors.email && errors.email.message != undefined ) && errors.email.message.toString()}
          color="success"
          size='small'
          {...register('email', {
            required: {
              value: true,
              message: 'Correo electrónico requerido',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Correo electronico invalido',
            },
          })}
        />

        {/* Contraseña*/}
        <TextField
          margin="dense"
          fullWidth
          label="Contraseña"
          type='password'
          error={errors?.password ? true : false}
          helperText={(errors.password && errors.password.message != undefined ) && errors.password.message.toString()}
          color="success"
          size='small'
          {...register('password', {
            required: {
              value: true,
              message: 'Contraseña requerida',
            }
          })}
        />
        {/* Confirmar Contraseña */}
        <TextField
          margin="dense"
          fullWidth
          label="Confirmar Contraseña"
          type='password'
          error={errors?.passwordConfirmation ? true : false}
          helperText={(errors.passwordConfirmation && errors.passwordConfirmation.message != undefined ) && errors.passwordConfirmation.message.toString()}
          color="success"
          size='small'
          {...register('passwordConfirmation', {
            required: {
              value: true,
              message: 'Confirmar Contraseña requerido',
            },
            validate: (value: any) => value === watch('password') || 'It must be the same as the password',
          })}
        />
        {/* Posicion */}
        <TextField
          margin="dense"
          fullWidth
          label="Posición"
          type='text'
          error={errors?.position ? true : false}
          helperText={(errors.position && errors.position.message != undefined ) && errors.position.message.toString()}
          color="success"
          size='small'
          {...register('position', {
            required: {
              value: true,
              message: 'Posición requerido',
            },
          })}
        />
        {/* Institución */}
        <TextField
          margin="dense"
          fullWidth
          label="Institución"
          type='text'
          error={errors?.institution ? true : false}
          helperText={(errors.institution && errors.institution.message != undefined ) && errors.institution.message.toString()}
          color="success"
          size='small'
          {...register('institution', {
            required: {
              value: true,
              message: 'Institución requerido',
            },
          })}
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          className=" mt-[10px] p-2 text-[23px] text-green-600 w-full h-[50px] flex justify-center items-center">
          Registrarse
        </Button>
      </form>
    </>
  )
}
