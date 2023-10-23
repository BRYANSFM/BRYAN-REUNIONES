'use client'

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

        {/* Firstname */}
        <label className="font-bold underline underline-offset-2   ">
          Firstname
        </label>
        <input
          className={ClaseInput}
          type="text"
          placeholder='Firstname'
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
        {errors.firstname && <span className={ClaseSpan}>{errors.firstname.message}</span>}

        {/* Lastname */}
        <label className="font-bold underline underline-offset-2   ">
          Lastname
        </label>
        <input
          className={ClaseInput}
          type="text"
          placeholder='Lastname'
          {...register('lastname', {
            required: {
              value: true,
              message: 'Lastname is required',
            },
          })}
        />
        {errors.lastname && <span className={ClaseSpan}>{errors.lastname.message}</span>}

        {/* Email */}
        <label className="font-bold underline underline-offset-2   ">
          Email
        </label>
        <input
          className={ClaseInput}
          type="email"
          placeholder='Email'
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
        {errors.email && <span className={ClaseSpan}>{errors.email.message}</span>}

        {/* Password */}
        <label className="font-bold underline underline-offset-2 ">
          Password
        </label>
        <input
          className={ClaseInput}
          type="password"
          placeholder='Password'
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message: 'The password must have at least one capital letter and numbers'
            }
          })}
        />
        {errors.password && <span className={ClaseSpan}>{errors.password.message}</span>}

        <label className="font-bold underline underline-offset-2 ">
          Password Confirmation
        </label>
        <input
          className={ClaseInput}
          type="password"
          placeholder='Password Confirmation'
          {...register('passwordConfirmation', {
            required: {
              value: true,
              message: 'Password is required',
            },
            validate: (value) =>
              value === watch('password') || 'Passwords do not matchs',
          })}
        />
        {errors.passwordConfirmation && <span className={ClaseSpan}>{errors.passwordConfirmation.message}</span>}

        {/* Position */}
        <label className="font-bold underline underline-offset-2   ">
          Position
        </label>
        <input
          className={ClaseInput}
          type="text"
          placeholder='Position'
          {...register('position', {
            required: {
              value: true,
              message: 'Position is required',
            },
          })}
        />
        {errors.position && <span className={ClaseSpan}>{errors.position.message}</span>}

        {/* Institution */}
        <label className="font-bold underline underline-offset-2   ">
          Institution
        </label>
        <input
          className={ClaseInput}
          type="text"
          placeholder='Institution'
          {...register('institution', {
            required: {
              value: true,
              message: 'Institution is required',
            },
          })}
        />
        {errors.institution && <span className={ClaseSpan}>{errors.institution.message}</span>}

        <button
          className="  mt-[10px] hover:bg-[#083f48] bg-[#17b1c8] p-2 text-white  text-[23px] w-full h-[50px] rounded-[5px] flex justify-center items-center">Log in
        </button>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  )
}
