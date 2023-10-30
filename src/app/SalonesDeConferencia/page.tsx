"use client";
import {Pagination, Collapse, Grid , Button, Stack, Card, CardActions, CardContent, CardHeader, Typography, styled, Paper, Popover } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Box from '@mui/system/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import  LogoOGTIC  from '../LogoOGTIC/logo.webp'
import axios from '@/axios'
import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupsIcon from '@mui/icons-material/Groups';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useRouter } from 'next/navigation';
import cookie from 'js-cookie'



function substringAndReplace({fecha, t} : {fecha: string, t: string}) {
  // Encuentra la posición del caracter 'T'
  const tIndex = fecha.indexOf(t);

  // Si no se encuentra el caracter 'T', devuelve la cadena original
  if (tIndex === -1) {
    return fecha;
  }

  // Crea una nueva cadena con los caracteres de la cadena original desde el principio hasta la posición del caracter 'T', excluyendo la T
  const substring = fecha.substring(0, tIndex).slice(0, -1);

  // Reemplaza todos los '-' por '/'
  const replacedSubstring = substring.replace(/-/g, "/");

  // Devuelve la cadena con el '-' reemplazado por '/'
  return replacedSubstring;
}
function encontrarNumeroEnCadena(cadena: string): string | null {
  const numerosEncontrados = cadena.match(/\d+/); // Busca un número en la cadena

  return numerosEncontrados ? numerosEncontrados[0] : null
}


const SalonesDeConferencia = () => {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);
  const [selectId, setSelectId] = useState<number | null>()
  const [noPage, setNoPage] = useState(1)
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const params : Object = {
    take: 2,
    page: noPage,
    sort: 'ASC',
    meeting_type: 'Externa'
  } 

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const getReuniones = async () => {
    const res = await axios.get( `/meetings`, {params: params});
    const { data } = res.data
    return data
  }

  const {isLoading , data , isError , error, refetch, } = useQuery({
    queryKey: ['reuniones',params],
    queryFn: getReuniones,
  });

  return (
    <Stack  className=' gap-[20px] flex justify-center items-center'>
      <Stack className=' w-screen h-[50px] flex items-end '>
        <Button  color='primary' className=' bg-red-500/100 mx-[5%]' sx={{color: "black", width: '15%'}} variant='contained' onClick={()=>{
          cookie.remove('token')
          router.push('/')
        }}>SIGN OFF</Button>
      </Stack>
      <img src={LogoOGTIC.src} alt="Logo del OGTIC" className='w-[300px]' />

      <h1 className='text-[35px] font-extrabold underline underline-offset-2'> Salones de conferencias</h1>

      <Stack justifyContent={'center'} alignItems={'center'} className="w-screen gap-[15px] p-[10px] h-[125px] bg-[#0015ff4d]">

        <h1 className=' italic text-[20px] text-white font-semibold flex justify-center items-center'> Aqui presentaremos todas las reuniones y minutas realizadas</h1>
        
        <Button 
          className='gap-[10px] w-[300px] bg-[purple]' 
          color="info" 
          size='large' 
          variant='contained'
        >
          <ControlPointIcon fontSize='medium'/>
          CREAR NUEVA

        </Button>
      </Stack>
      
      <Box sx={{backgroundColor: "inherit", minWidth: 700, minHeight: 20, pb: 2, display: "flex"}}>
        <Button  color='inherit' className='font-bold' sx={{p: 1,px:2, borderRadius: 5, gap: 0.8, color: "#001142", fontSize: 17}} variant='outlined' onClick={(event)=> setAnchorEl(event.currentTarget)}>Filtros <FilterAltIcon/></Button> 
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={()=> setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <h1 className='w-[80px] h-[50px]'>hola</h1>
        </Popover>
      </Box>

      {data?.map((reuniones: any) => (
        <Card key={reuniones.id} sx={{backgroundColor: "#001142", minWidth: 700, minHeight: 300, pb: 2}}>
          <CardHeader
            sx={{backgroundColor: "#0064d2", color: "white", height: "50px" , textAlign: 'center' }}
            title="PARTICIPANTE/ANFITRION"
          />
          <CardContent>
            <h1 className='text-white text-[20px] font-extrabold'>{reuniones.summary}</h1>
            <h3 className='text-[#b5a9a9] text-[15px] font-extrabold'>{substringAndReplace({fecha: reuniones.date, t: 'T'})}</h3>
          </CardContent>
          
          <Collapse in={selectId === reuniones.id} timeout="auto" unmountOnExit>
            <CardContent sx={{bgcolor: 'red'}}>
              <p className='text-white font-bold'> EN PROCESO</p>
            </CardContent>
          </Collapse>

          <CardContent className='flex justify-center items-center' sx={{height: "80px", px: 2.1 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
              <Grid item xs={6}>
                <Box className="flex flex-row" sx={{color: '#0064d2', fontSize: '20px' }}>
                  <AccessTimeOutlinedIcon sx={{fontSize: '30px'}} />
                  <h1 className='font-bold mx-[5px]'>{reuniones.start_time.slice(0,-3)}</h1>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box className="flex flex-row" sx={{color: '#0064d2', fontSize: '20px' }}>
                  <ApartmentIcon sx={{fontSize: '30px'}} />
                  <h1 className='font-bold mx-[5px]'>Salon {encontrarNumeroEnCadena(reuniones.room.name)}</h1>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box className="flex flex-row" sx={{color: '#0064d2', fontSize: '20px' }}>
                  <CalendarMonthIcon sx={{fontSize: '30px'}} />
                  <h1 className='font-bold mx-[5px]'> {substringAndReplace({fecha: reuniones.date, t: 'T'})}</h1>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box className="flex flex-row" sx={{color: '#0064d2', fontSize: '20px' }}>
                  <GroupsIcon sx={{fontSize: '30px'}} />
                  <h1 className='font-bold mx-[5px]'>{reuniones.meeting_type}</h1>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{display: 'flex', justifyContent: 'center',mr: 1.5, mt: 1}}>
            <Button  className='bg-[#29324a] h-[40px] - w-[50%] mx-3' color='primary' variant='contained'> Minuta</Button>
            <Button
              onClick={()=>{
                setSelectId(selectId === reuniones.id ? null : reuniones.id)
              }}
              className='bg-[#0064d2] h-[40px] w-[50%]' color='info' variant='contained'> Detalles
            </Button>
          </CardActions>
        </Card>
      ))}

      <Pagination 
        color="primary" 
        count={3}
        size='large'
        sx={{m: 2}}
        onChange={(event, value)=> setNoPage(value)}
      />
    </Stack>
  )
}

export default SalonesDeConferencia