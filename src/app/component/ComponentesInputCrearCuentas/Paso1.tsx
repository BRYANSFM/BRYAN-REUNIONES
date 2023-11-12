import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useRouter } from 'next/navigation';
import axios from '@/axios'
import Link from 'next/link';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteModule } from 'next/dist/server/future/route-modules/route-module';

const getRooms = async () => {
  const res = await axios.get('/meeting-rooms',);
  const { data } = res.data

  return data
}

type F = {
  handleNext: (event: any) => any,
  room: string | number,
  date: string | null,
  start_time: null | Dayjs,
  end_time: null | Dayjs,
}

function Paso1({ handleNext, date, end_time, room, start_time }: F) {

  const schema = z.object({
    room: z.number().min(1, { message: 'This field is required' }),
    date: z.string().min(1, { message: 'debes llenar eto' }),
    start_time: z.any().refine((val: any) => val, {
      message: "This field is required",
    }),
    end_time: z.any().refine((val: any) => val, {
      message: "This field is required",
    }),
  })

  const outerTheme = useTheme();
  const { isLoading, data, isError, error, refetch, } = useQuery({
    queryKey: ['rooms'],
    queryFn: getRooms,
  });
  console.log({ date })
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      room: room,
      date: date,
      start_time: start_time,
      end_time: end_time,
    }
  });
  console.log(watch())

  const theme = (theme: any) => createTheme({
    ...theme,
    components: {
      MuiDatedate: {
        styleOverrides: {
          root: {}
        }
      },
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
    <>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <form className=' flex gap-5 flex-col w-[450px]'
        onSubmit={handleSubmit(handleNext)}
      >
        <FormControl fullWidth sx={{ minWidth: 120 }} size="small">
          <InputLabel color='primary'>room</InputLabel>
          <Select
            sx={{ fontWeight: "bold" }}
            defaultValue={room}
            color='primary'
            size='medium'
            id="demo-select-small"
            label="Age"
            {...register('room', {
              // required: {
              //   value: true,
              //   message: 'room es requerida',
              // },
              // validate: (value) => !value  || 'room is required',
            })}
          >
            {data?.map((rooms: any) => (
              <MenuItem
                key={rooms.name}
                value={rooms.id}
              >
                {rooms.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.room && (
          <span className='text-red-700'>{errors.room.message}</span>
        )}
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ width: "100%" }} components={['DatePicker']}>
              <DatePicker
                defaultValue={date === "" ? null : dayjs(date)}
                sx={{ width: "100%" }}
                label="Hora"
                // {...register('date', {
                //   // required: {
                //   //   value: true,
                //   //   message: 'date es requerida',
                //   // },
                //   // validate: (value) => value != null || 'date is required',
                // })}
                // value={pruebadate}
                onChange={(e: any) => {
                  if (e != null) {
                    setValue("date", e.format('YYYY-MM-DD'))
                    // console.log(watch('date').format('YYYY-MM-DD'))
                  }
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.date && (
            <span className='text-red-700'>{errors.date.message}</span>
          )}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ width: "100%" }} components={['TimePicker']}>
              <TimePicker
                defaultValue={start_time === null ? null : dayjs(start_time)}
                sx={{ width: "100%" }}
                label="Hora de inicio"
                // {...register('start_time', {
                //   // required: {
                //   //   value: true,
                //   //   message: 'Hora de inicio',
                //   // },
                //   // validate: (value) => value != null || 'Hora de inicio is required',
                // })}
                onChange={(e: any) => {
                  if (e != null) {
                    setValue("start_time", e)
                    // console.log(watch('date').format('HH:mm'))
                  }
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.start_time && (
            <span className='text-red-700'>{errors.start_time.message}</span>
          )}
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer sx={{ width: "100%" }} components={['TimePicker']}>
              <TimePicker
                defaultValue={end_time === null ? null : dayjs(end_time)}
                sx={{ width: "100%" }}
                label="Hora de cierre"
                // {...register('end_time', {
                //   // required: {
                //   //   value: true,
                //   //   message: 'Hora de cierre es requerida',
                //   // },
                //   // validate: (value) => value != null || 'Hora de cierre is required',
                // })}
                onChange={(e: any) => {
                  if (e != null) {
                    setValue("end_time", e)
                    // console.log(watch('date').format('HH:mm'))
                  }
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.end_time && (
            <span className='text-red-700'>{errors.end_time.message}</span>
          )}
        </ThemeProvider>
        <Button
          fullWidth
          className='h-12 mt-2 bg-blue-500 text-xl'
          type='submit'
          variant='contained'
          color='info'
        >
          Siguiente
        </Button>
      </form>
      <Link href={'../SalonesDeConferencia'}>
        <Button
          className='h-12 mt-5  w-[450px]  text-xl'
          type='submit'
          variant='outlined'
          color='inherit'
        >
          Cancelar
        </Button>
      </Link>
    </>
  )
}

export default Paso1