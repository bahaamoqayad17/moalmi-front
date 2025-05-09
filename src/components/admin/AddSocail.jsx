import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm,Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {useSnackbar} from 'notistack'
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

export default function AddSocail() {
    
    const {token} = useSelector((state)=>state.admin)
    const {t} = useTranslation()
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()

    const lang = Cookies.get("i18next") || "en";
    const { register,control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            link:""
        }
    });
    
    async function onSubmit(data)
    {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_KEY}api/v1/admin/level`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":token
                },
                body:JSON.stringify({titleAR:data.title_ar,titleEN:data.title_en})
            })
            if(response.status!==200&&response.status!==201)
            {
                throw new Error('failed occured')
            }
            const resData = await response.json()
            enqueueSnackbar(lang==="ar"?resData.msg.arabic:resData.msg.english,{variant:"success",autoHideDuration:8000})
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <>
            <Box sx={{width:"500px",maxWidth:"100%"}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{marginBottom:"18px"}}>
                            <InputLabel sx={{marginBottom:"6px",fontSize:"14px"}}>{t('link')}</InputLabel>
                            <Controller
                            name="link"
                            control={control}
                            render={({ field }) => <TextField {...field} fullWidth/>}
                            {...register("link", { required: "title Address is required" })}
                            />
                            {errors.link?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>{t('required')}</Typography>}
                        </Box>
                        <Button variant="contained" type="submit" sx={{ml:"6px",mr:"6px"}}>{t('save')}</Button>
                    </form>
            </Box>
        </>
    )
}