import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Box , Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

//#1f2329
export default function Container({children}) {
    let sxCard = { width:1, border:1, borderRadius:2,padding:0, borderColor:"#d0d7de", margin:0}
    return ( <Box sx={sxCard}> {children} </Box> );
}