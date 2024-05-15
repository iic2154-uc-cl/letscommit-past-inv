import Tag from "./Tag";
import Looks3Icon from '@mui/icons-material/Looks3';

export default function TagBot3({sx}) {
    return (<Tag sx={sx} text='BOT ' icon={<Looks3Icon fontSize="small" sx={{color:'orange.dark'}}/>} color={'orange'}/>);
}