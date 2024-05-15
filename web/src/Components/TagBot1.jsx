import Tag from "./Tag";
import LooksOneIcon from '@mui/icons-material/LooksOne';

export default function TagBot1({sx}) {
    return (<Tag sx={sx} text='BOT ' icon={<LooksOneIcon fontSize="small" sx={{color:'green.dark'}}/>} color={'green'}/>);
}