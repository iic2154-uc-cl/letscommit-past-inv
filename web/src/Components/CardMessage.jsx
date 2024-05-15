import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Box , Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function CardMessage({message,repositoryName,repositoryLink,commitSHA}) {
    let sxCard = { width:1, border:1, borderRadius:2,padding:0, borderColor:"#d0d7de", background:"#f5f6f8", margin:0}
    return (
        <Card variant='outlined' sx={sxCard}>
                <Box sx={{width:0.5, padding:2, py:2.5, borderColor:"#d0d7de",margin:0}}>
                    <Typography display={'inline'} variant='h6' color="#1f2329">
                    {message}
                    </Typography>
                </Box>
                <Box sx={{py:1.5,px:2,borderTop:1,borderColor:"#d0d7de",background:"#ffffff",margin:0, display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Typography variant='subtitle1' fontWeight={600} color="#1f2329" sx={{px:3}}>
                    {commitSHA}
                    </Typography>
                    <Button sx={{ textTransform:'none'}} target="_blank" rel="noopener noreferrer" href={repositoryLink} variant="contained" disableElevation startIcon={<GitHubIcon/>}>
                        <Typography variant='subtitle2'>
                        {repositoryName}
                        </Typography>
                    </Button>
                </Box>
        </Card>
    );
}