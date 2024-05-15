import React from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TagBot1 from './TagBot1';
import TagBot2 from './TagBot2';
import TagBot3 from './TagBot3';
import Tag from './Tag';
import PersonIcon from '@mui/icons-material/Person';

export default function CardMessages({messages,repositoryName,repositoryLink,commitSHA}) {
    let sxCard = { width:1, border:1, borderRadius:2,padding:0, borderColor:"#d0d7de", margin:0, display:'flex',flexDirection:'column'}
    if (messages == undefined )
        return null;
    let authorMessage = messages.find((m)=>m.name=="author")['message']
    let bot1Message = messages.find((m)=>m.name=="bot1")['message']
    let bot2Message = messages.find((m)=>m.name=="bot2")['message']
    let bot3Message = messages.find((m)=>m.name=="bot3")['message']
    return (
        <Card variant='outlined' sx={sxCard}>
                <Box sx={{display:'flex',flexDirection:'column'}}>
                    <Box sx={{ padding:2, py:2.5,borderBottom:1, borderColor:"#d0d7de",margin:0,display:'flex',background:"#f5f6f8"}}>
                        <Box sx={{alignSelf:'start', marginRight:'auto'}}><Tag text='USER' color='grey'/></Box>
                        <Typography sx={{width:1, px:2}} display={'inline'} variant='h6' color="#1f2329">
                        {authorMessage}
                        </Typography>
                    </Box>
                    <Box sx={{display:'flex',justifyContent: 'space-between', flexDirection:'row', padding:2}}>
                    <Typography variant='subtitle1' fontWeight={600} color="#646d76" sx={{paddingBottom:2}}>
                    SHA: {commitSHA}
                    </Typography>
                    <Button sx={{ textTransform:'none',width:'fit-content'}} target="_blank" rel="noopener noreferrer" href={repositoryLink} variant="contained" disableElevation startIcon={<GitHubIcon/>}>
                        <Typography variant='subtitle2'>
                        {repositoryName}
                        </Typography>
                    </Button>
                    </Box>
                </Box>
                <Box sx={{display:'flex',flexDirection:'column', background:"#f5f6f8"}}>
                    <Box sx={{padding:2, py:2.5,borderTop:1,borderBottom:1, borderColor:"#d0d7de",margin:0,display:'flex'}}>
                        <Box sx={{alignSelf:'start', marginRight:'auto'}}><TagBot1/></Box>
                        <Typography sx={{width:1, px:2}} display={'inline'} variant='h6' color="#1f2329">
                        {bot1Message}
                        </Typography>
                    </Box>
                    <Box sx={{padding:2, py:2.5,borderBottom:1, borderColor:"#d0d7de",margin:0, display:'flex'}}>
                        <Box sx={{alignSelf:'start', marginRight:'auto'}}><TagBot2/></Box>
                        <Typography sx={{width:1, px:2}} display={'inline'} variant='h6' color="#1f2329">
                        {bot2Message}
                        </Typography>
                    </Box>
                    <Box sx={{padding:2, py:2.5, borderColor:"#d0d7de",margin:0, display:'flex'}}>
                        <Box sx={{alignSelf:'start', marginRight:'auto'}}><TagBot3/></Box>
                        <Typography sx={{width:1, px:2}} display={'inline'} variant='h6' color="#1f2329">
                        {bot3Message}
                        </Typography>
                    </Box>
                </Box>
        </Card>
    );
}