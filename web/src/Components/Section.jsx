import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Box , Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Section({sectionContent}) {
    return (
        <Box sx={{width:1}}>
            <Typography variant={sectionContent.titleVariant} sx={{marginTop:3,marginBottom:1.5}} color="#1f2329">
                {sectionContent.title}
            </Typography>
            {
                sectionContent.paragraphs.map((p)=>{
                    return (<Typography sx={{marginBottom:1}} color="#1f2329">
                        {p}
                    </Typography>);
                })
            }
        </Box>
            
    );
}