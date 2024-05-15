import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/material';
import { Margin } from '@mui/icons-material';

export default function RadioButtonsForm({questionId,options,value,onChange}) {

  return (
    <Box>
    <FormControl>
      <RadioGroup row value={value} onChange={(event)=>onChange(event,questionId)}>
      {options.map((n,i)=>{
        return (<FormControlLabel key={i} value={n.value} labelPlacement="top" control={<Radio key={i}/>} label={n.label} />)})}
      </RadioGroup>
    </FormControl>
    </Box>
  );
}