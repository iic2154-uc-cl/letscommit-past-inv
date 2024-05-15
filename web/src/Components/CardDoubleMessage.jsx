import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TagBot1 from './TagBot1';
import TagBot2 from './TagBot2';

export default function CardDoubleMessage({message1,message2,repositoryName,repositoryLink,commitSHA}) {
    let sxCard = { width:1, border:1, borderRadius:2,padding:0, borderColor:"#d0d7de", background:"#f5f6f8", margin:0}
    return (
        <Card variant='outlined' sx={sxCard}>
                <Box sx={{display:'flex',}}>
                <Box sx={{width:0.5, padding:2, py:2.5, borderColor:"#d0d7de",margin:0,display:'flex'}}>
                    <Box sx={{alignSelf:'start', marginRight:'auto'}}><TagBot1/></Box>
                    <Typography sx={{width:1, px:2}} display={'inline'} variant='h6' color="#1f2329">
                    {message1}
                    </Typography>
                </Box>
                <Box sx={{width:0.5, padding:2, py:2.5, borderLeft:1, borderColor:"#d0d7de",margin:0, display:'flex'}}>
                    <Box sx={{alignSelf:'start', marginRight:'auto'}}><TagBot2/></Box>
                    <Typography sx={{width:1, px:2}} display={'inline'} variant='h6' color="#1f2329">
                    {message2}
                    </Typography>
                </Box>
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