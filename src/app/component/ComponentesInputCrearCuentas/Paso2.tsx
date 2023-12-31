import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Button, Box, Stack } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useForm } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles'
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "juan.perez@gmail.com",
  "maria.lopez@hotmail.com",
  "luis.garcia@yahoo.com",
  "ana.martinez@outlook.com",
  "david.gonzalez@live.com",
  "laura.sanchez@aol.com",
  "pedro.rubio@msn.com",
  "esther.diaz@icloud.com",
  "carlos.romero@protonmail.com",
];
function getStyles({ name, personName, theme }: { name: any, personName: any, theme: any }) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type F = {
  handleNext: (event: any) => any,
  DatosObtenidos: (event: any) => any,
  meeting_type: string,
  participants: string | [],
}

function Paso2({ handleNext,DatosObtenidos, meeting_type, participants }: F) {
  const theme = useTheme();
  const [personName, setPersonName] = useState(participants);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      meeting_type: meeting_type,
      participants: participants,
    }
  });
  console.log(errors)

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setValue("participants", value)
  };
  // const theme1 = (theme: any) => createTheme({
  //   ...theme,
  //   components: {
  //     MuiDateCalendar: {
  //       styleOverrides: {
  //         root: {
  //           borderRadius: 2,
  //           borderWidth: 1,
  //         }
  //       }
  //     },
  //   }
  // });

  return (
    <>
      <form className=' flex items-center gap-5 flex-col w-[450px] '
        onSubmit={handleSubmit((e)=> handleNext(e))}
      >
        <FormControl fullWidth sx={{ minWidth: 120 }} size="small">
          <InputLabel color='primary'>Salon</InputLabel>
          <Select
            defaultValue={meeting_type}
            sx={{ fontWeight: "bold" }}
            color='primary'
            size='medium'
            label="Tipo de Reunion"
            {...register('meeting_type')}
          >
            <MenuItem value='Externa'>Externa</MenuItem>
            <MenuItem value='Interna'>Interna</MenuItem>
          </Select>
        </FormControl>
        {/* {errors.meeting_type && (
          <span className='text-red-700'>{errors.meeting_type.message}</span>
        )} */}
        <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Participantes</InputLabel>
          <Select
            defaultValue={participants}
            id="demo-multiple-chip"
            multiple
            // Highlights
            value={personName}
            onChange={handleChange}
            sx={{ fontWeight: "bold" }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected: any) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value: any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles({ name, personName, theme })}
              >
                <Checkbox checked={personName.indexOf(name as never) > -1} />
                {name}
              </MenuItem>
            ))}
          </Select>

        </FormControl>
        <Button
          fullWidth
          className='h-12 bg-blue-500 text-xl'
          type='submit'
          variant='contained'
          color='info'
        >
          Siguiente
        </Button>
      </form>

      <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}  className='mb-6  mt-4 gap-5 w-[450px]'>
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
    </>
  )
}

export default Paso2