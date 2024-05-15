import RadioButtonsForm from "./RadioButtonsForm";
import { Box, Typography } from "@mui/material";
import TagBot1 from "./TagBot1";
import TagBot2 from "./TagBot2";
import TagBot3 from "./TagBot3";

export default function QuestionScaleSelect({question,maxValue,surveyAnswer,handleRadioChange}) {
    let sxCard = {marginBottom:4, border:1, borderRadius:2, borderColor:"#d0d7de"}
    let tags = [<TagBot1/>,<TagBot2/>,<TagBot3/>];
    let radioButtonGroups = question.questionIds.map((qId,idx)=>{
        return (<Box sx={{width:1, padding:1.5, display:'flex',alignItems:'center',justifyContent:'center'}}>
            {question.questionIds.length > 1 ? (<Box sx={{alignSelf:'start', marginRight:'auto'}}>{tags[idx]}</Box>) : null}
            <Box sx={{width:1, display:'flex',justifyContent:'center'}}>       
                <RadioButtonsForm 
                    questionId={qId} 
                    options={[...Array(maxValue).keys()].map((ansId)=>{return {"label":(ansId+1).toString(),"value":(ansId+1).toString()};})} 
                    value={surveyAnswer == null ? null : surveyAnswer.answers[qId-1].answer} 
                    onChange={handleRadioChange}    
                />
            </Box>
        </Box>);
    });
    return (
        <Box sx={sxCard}>
            <Box sx={{ borderTopLeftRadius:8,borderTopRightRadius:8,borderBottom:1,borderColor:"#d0d7de", padding:2,background:"#f5f6f8"}}>
                <Typography variant='h6' color="#1f2329">
                {question.statement}
                </Typography>
            </Box>
            <Box sx={{display: 'flex',justifyContent:'stretch', flexDirection:'column'}}>
            {
                radioButtonGroups.map((opt)=>{return opt;})
            }
            </Box>
        </Box>
    );
}