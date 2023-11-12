import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { TextField, Button, Box, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';
import axios from '@/axios'
import Link from 'next/link';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useQuery, useMutation } from '@tanstack/react-query'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type F = {
  handleNext: (event: any) => any,
  DatosObtenidos: (event: any) => any,
  details: string,
  summary: string,
  subject: string,
}

function Paso3({handleNext, DatosObtenidos, details, summary, subject} : F) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      subject: subject,
      summary: summary,
      details: details,
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
        
      </form>
      <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}  className=' mt-4 mb-6 gap-5 w-[450px]'>
        <Button 
          variant='outlined'
          color='warning'
          className='w-[50%] h-12 text-xl gap-4'
          onClick={() => DatosObtenidos(watch())}
        >
          <ArrowBackIcon/>
          Atras
        </Button>
        <Link className='h-12  w-[50%]' href={'../SalonesDeConferencia'}>
          <Button
            className='h-[100%]  w-[100%]  text-xl'
            type='submit'
            variant='outlined'
            color='inherit'
          >
            Cancelar
          </Button>
        </Link>
      </Stack>
      {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
    </ThemeProvider>
  )
}

export default Paso3;