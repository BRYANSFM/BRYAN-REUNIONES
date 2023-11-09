"use client";

import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import Link from 'next/link';
import axios from '@/axios';
import toast from 'react-hot-toast';
import Paso1 from '../component/ComponentesInputCrearCuentas/Paso1';
import Paso2 from '../component/ComponentesInputCrearCuentas/Paso2';
import Paso3 from '../component/ComponentesInputCrearCuentas/Paso3';

const steps = ['','','']


export default function CreacionReuniones() {
  const [id, setId] = useState<string>();
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [datosCuentas, setDatosCuentas] = useState({})

  const CrearReuniones = async (body: object) => {
    const res = await axios.post('/meetings',body)
    return res.data
  }
  const queryClient = useQueryClient()
  const addNewReuniones = useMutation({
    mutationFn: CrearReuniones,
    onSuccess: () => {
      toast.dismiss(id)
      queryClient.invalidateQueries('reuniones')
      // router.push('/SalonesDeConferencia')
    },
    onError: () => {
      toast.dismiss(id)
    },
  })
  useEffect(() => {
    if (addNewReuniones.isPending) {
      setId(toast.loading("Loading..."))
    }
  }, [addNewReuniones.isPending])

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };
  const Next = (datos:object) => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep(activeStep + 1);
    setSkipped(skipped);
    setDatosCuentas({...datosCuentas,...datos})
  }  
  if (activeStep === steps.length) {
    addNewReuniones.mutate(datosCuentas)
    router.push('../SalonesDeConferencia')
  }

  return (
    <Box className=" flex justify-center items-center flex-col gap-6" sx={{ width: '100%' }}>
      {/* <pre className='text-lg text-red-500'>{JSON.stringify(datosCuentas, null, 2)}</pre> */}
      <Stepper className='w-56  h-20 flex justify-center items-center' alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} >
              <StepLabel ></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Stack 
        justifyContent={'center'} 
        alignItems={'center'} 
        className=" w-100% gap-[15px] px-44 h-20 bg-[#0015ff4d]"
      >
        <h1 className=' italic text-[20px] text-white font-semibold flex justify-center items-center'> 
          Introduce los datos solicitados para la creación de tu reunión:
        </h1>
      </Stack>
      {activeStep === steps.length ||  
        <Box>
         {activeStep === 0 && <Paso1 handleNext={Next}/>}
         {activeStep === 1 && <Paso2 handleNext={Next}/>}
         {activeStep === 2 && <Paso3 handleNext={Next}/>}
        </Box>
      }
    </Box>
    
  );
}





