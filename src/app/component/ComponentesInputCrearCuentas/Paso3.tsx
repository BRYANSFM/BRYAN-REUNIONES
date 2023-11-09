import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box } from '@mui/material';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';
import axios from '@/axios'
import Link from 'next/link';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useQuery, useMutation } from '@tanstack/react-query'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form';


function Paso3({handleNext} : {handleNext: (event: any) => any}) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      subject: '',
      summary: '',
      details: '',
    }
  });
  console.log(errors)
  const theme = (theme: any) => createTheme({
    ...theme,
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
          }
        }
      },
    }
  });
  
  return (
    <ThemeProvider theme={theme}>
      <form 
        className='flex justify-center items-center gap-5 flex-col w-[450px]' 
        onSubmit={handleSubmit(handleNext)}
      >
        <TextField
          sx={{fontWeight: "bold"}}
          error={errors?.subject ? true : false} 
          helperText={errors.subject && errors.subject.message}
          multiline
          className='text-blue'
          fullWidth
          label="Asunto"
          {...register('subject', {
            required: {
              value: true,
              message: 'El asunto es requerido',
            },
          })}
        />
        <TextField
          multiline
          fullWidth
          rows={5}
          maxRows={10}
          error={errors?.summary ? true : false} 
          helperText={errors.summary && errors.summary.message}
          label="Resumen/Temas"
          {...register('summary', {
            required: {
              value: true,
              message: 'Resumen/Temas es requerido',
            },
          })}
        />
        <TextField
          label="Resumen/Temas"
          multiline
          fullWidth
          rows={10}
          maxRows={10}
          error={errors?.details ? true : false} 
          helperText={errors.details && errors.details.message}
          {...register('details', {
            required: {
              value: true,
              message: 'Detalles Principales es requerido',
            },
          })}
        />
        <Button 
          fullWidth
          className='h-12 bg-blue-500 text-xl '
          type='submit' 
          variant='contained' 
          color='info'
        >
          Crear
        </Button>
        
        <Button 
          fullWidth
          className='h-12 mt-2 bg-white text-xl'
          type='submit' 
          variant='text' 
          color='inherit'
        >
          Cancelar
        </Button>
      </form>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </ThemeProvider>
  )
}

export default Paso3;