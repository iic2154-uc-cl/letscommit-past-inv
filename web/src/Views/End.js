import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
function End() {
    return (
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center',my:10}}>
            <Box sx={{width:0.80,display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                <Typography sx={{marginBottom:4}} variant='h3'>Has terminado la encuesta</Typography>
                <Typography sx={{marginBottom:4}} variant='body1'>Puedes cerrar esta pestaña, tus resultados han sido guardados</Typography>
            </Box>
        </Box>
    );
}

export default End;