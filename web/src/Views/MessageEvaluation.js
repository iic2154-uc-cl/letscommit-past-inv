import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CardDoubleMessage from "../Components/CardDoubleMessage";
import CardMessages from "../Components/CardMessages";
import { Box, Typography, Button } from "@mui/material";
import RadioButtonsForm from "../Components/RadioButtonsForm";
import CodeBlock from "../Components/CodeBlock";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getFromAPI, postToAPI, putToAPI } from '../apiRequests';
import QuestionScaleSelect from '../Components/QuestionScaleSelect';
import Alert from '@mui/material/Alert';

function MessageEvaluation() {
  const navigate = useNavigate();
  let sxCard = {marginBottom:2, border:1, borderRadius:2, borderColor:"#d0d7de"}
  let questions = [
    {
      questionIds:[1], 
      statement:"¿Qué tan satisfecho estás al usar un bot para mejorar tus mensajes commit?\n(1 Muy insatisfecho - 5 Muy satisfecho)",
    },
    {
      questionIds:[2,3,4],
      statement:"¿Fue fácil entender las recomendaciones de los bots?\n(1 Muy difícil - 5 Muy fácil)",
    },
    {
      questionIds:[5,6,7],
      statement:"¿Qué tan relevantes y útiles fueron las recomendaciones de los bots para mejorar tus mensajes commit?\n(1 Nada relevantes - 5 Muy relevantes)",
    },
    {
      questionIds:[8,9,10],
      statement:"¿Qué tan novedosas e innovadoras te parecieron las recomendaciones de los bots para mejorar tus mensajes commit?\n(1 Nada novedosas - 5 Muy novedosas)",
    },
    {
      questionIds:[11,12,13],
      statement:"¿En qué medida las recomendaciones de los bots te sorprendieron positivamente o te ofrecieron propuestas inesperadas y útiles? (1 Nada sorprendido - 5 Muy sorprendido)",
    },
    {
      questionIds:[14],
      statement:"¿Qué tan probable es que utilices un bot en el futuro para mejorar tus mensajes commit? (1 Nada probable - 5 Muy probable)",
    },
    {
      questionIds:[15,16,17],
      statement:"¿En qué medida crees que las recomendaciones del bot mejoraron la calidad y la redacción de tus mensajes commit? (1 No mejoraron - 5 Mejoraron bastante)",
    },
  ];
  let lastQuestion = questions[questions.length-1]
  let numberOfQuestions = lastQuestion.questionIds[lastQuestion.questionIds.length-1]
  let defaultSurveyAnswer = {
    "sha": null,
    "repository":null,
    "answers": [...Array(numberOfQuestions).keys()].map((qId)=>{return {"question_number":qId+1,"answer":null};})
  }
  let questionStatements;
  
  let host = "http://aicommit.ing.puc.cl";
  // let host = "http://localhost:5000";
  // let host = "http://localhost:8080";
  let urlCurrentCommit = host + "/api/assignment/todo"
  let urlNextCommit = host + "/api/assignment/todo"
  let surveyAnswersUrl = host + "/api/survey"

  const [commitMessageEvaluation, setCommitMessageEvaluation] = useState([])
  const [codeBlocks, setCodeBlocks] = useState([])
  const [surveyAnswer, setSurveyAnswer] = useState(null);
  const [showAlert,setShowAlert] = useState(false);
  const [firstTimeAnswered,setFirstTimeAnswered] = useState(true);
  const getCommit = async (url) => {
    try{
      const response = await getFromAPI(url);
      if (response.status == 200) {
        setCommitMessageEvaluation(response.data);
        setCodeBlocks(response.data.diff.map((cd)=>{ return cd;}));
      }
      if (response.status == 204)
        navigate("/end");
    }
    catch(error) {
      if (error.response) {
        if (error.response.status == 400)
          console.log("Something happend, the event was not created");
        
      }
    }
  };
  let alert = (<Alert sx={{marginBottom:1}} severity="error">Todas las preguntas son obligatorias</Alert>);
  const postSurveyAnswer = async (surveyAnswer) => {
    let response;
    try{
      
        response = await postToAPI(surveyAnswersUrl,surveyAnswer);
    }
    catch(error){
      //TO DO Show error
    }
  }
  const handleNext = async (event) => {
    event.preventDefault();
    if(surveyAnswer.answers.filter((sa)=>{return sa.answer!=null}).length == surveyAnswer.answers.length){
      await postSurveyAnswer(surveyAnswer);
      await getCommit(urlNextCommit);
      window.scrollTo(0, 0);
    }
    else{
      setShowAlert(true);
    }
  }
  
  useEffect( () => { 
    getCommit(urlCurrentCommit);
  }, []);
  useEffect(()=>{
    defaultSurveyAnswer.sha = commitMessageEvaluation.sha
    defaultSurveyAnswer.repository = commitMessageEvaluation.repo
    defaultSurveyAnswer['assignment_id'] = commitMessageEvaluation['assignment_id'];
    setSurveyAnswer(defaultSurveyAnswer);
  },[commitMessageEvaluation]);
  const handleRadioChange = (event,questionId) => {
    console.log(surveyAnswer);
    setShowAlert(false);
    let updatedAnswers = surveyAnswer.answers.map((ans)=>{
      if(ans.question_number == questionId){
        return { ...ans, answer: event.target.value }
      }
      else{
        return ans;
      }
    })
    let updatedSurveyAnswer = {...surveyAnswer , answers : updatedAnswers};
    /*updatedSurveyAnswer['assignment_id'] = commitMessageEvaluation['assignment_id'];
    updatedSurveyAnswer['assignment_id'] = commitMessageEvaluation['assignment_id'];*/
    setSurveyAnswer(updatedSurveyAnswer);
  };
  return (
    <Box sx={{ width:1, display: 'flex', justifyContent:'center',marginTop:1, flexWrap: 'wrap'}}>
                <Box sx={{paddingRight:2, width:0.5, display: 'flex',flexDirection:'column'}}>
                  <Typography variant='h5'>Code changes</Typography>
                  {
                    codeBlocks.map((cb)=>{
                      return (<Box sx={{border:1, borderRadius:2, borderColor:"#d0d7de"}}>
                        <CodeBlock code={cb.fileDiff} fileName={cb.fileName} />
                    </Box>);
                    })
                  }
                </Box>
                
                <Box sx={{paddingLeft:2,width:0.45, display: 'flex',flexDirection:'column', borderLeft:1, borderWidth:2,borderColor:"#d0d7de"}}>
                  <Box sx={{ width:1}}>
                    <Typography variant='h5' sx={{marginBottom:1}}>Commit message alternatives</Typography>
                    <CardMessages
                    messages={commitMessageEvaluation.messages} 
                    repositoryName={commitMessageEvaluation.repo} 
                    repositoryLink={commitMessageEvaluation.repo}
                    commitSHA={commitMessageEvaluation.sha}
                    />
                  </Box>
                  <Typography variant='h5' sx={{marginTop:2,marginBottom:1}}>User experience survey</Typography>
                  {
                    questions.map((q,i)=>{
                      return (<QuestionScaleSelect 
                        question={q} 
                        maxValue={5}
                        surveyAnswer={surveyAnswer} 
                        handleRadioChange={handleRadioChange}/> );
                    })
                  }
                  {showAlert ? alert : null}
                  <Button variant="contained" endIcon={<ArrowForwardIosIcon/>} onClick={handleNext}>
                    Siguiente
                  </Button>
                </Box>

            </Box>
  );
}

export default MessageEvaluation;