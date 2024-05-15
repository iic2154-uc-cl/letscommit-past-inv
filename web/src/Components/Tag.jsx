import { Box, Typography, Icon } from "@mui/material";

export default function Tag({text,icon,color,sx}) {
    let sxTagContainer = {borderRadius:1, display:'flex', backgroundColor:color+".light", px:0.5, height:1/*px*/ }
    return (
        <Box sx={sxTagContainer}>
            <Typography variant='subtitle1' fontWeight={800} color={color+".dark"}>
                {text}
            </Typography>
            {icon}
        </Box>
    );
}