import Tag from "./Tag";
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

export default function TagBot2({sx}) {
    return (<Tag sx={sx} text='BOT ' icon={<LooksTwoIcon fontSize="small" sx={{color:'purple.dark'}}/>} color={'purple'}/>);
}