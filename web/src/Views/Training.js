import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Section from '../Components/Section';

function Training() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate('/message');
    }

    let sxButton = {margin:5, marginBottom: 7, width:0.50, textTransform:'none'}
    let introductionParagraphs = [`Los proyectos de desarrollo de software experimentan cambios constantes en el código fuente, lo que genera múltiples versiones que deben integrarse. Para facilitar esta colaboración eficiente, existen sistemas de control de versiones como Git, que permiten gestionar los cambios en los archivos de código fuente.`,
        `Git proporciona un flujo de trabajo donde los desarrolladores pueden definir versiones a través de commits. Estos commits utilizan mensajes de commit en lenguaje natural para describir brevemente los cambios realizados. Sin embargo, generar estos mensajes consume tiempo, lo que ha llevado al desarrollo de modelos automáticos para su generación.`,
        `Aunque la evaluación de estos modelos es un área poco estudiada, la métrica BLEU utilizada para probar su rendimiento presenta limitaciones, ya que depende de un mensaje de referencia y no verifica si el mensaje cumple con la estructura de un "buen" mensaje de commit. Para abordar estas problemáticas, este estudio propone un experimento con desarrolladores para validar la idoneidad de la métrica BLEU y su correlación con la evaluación humana de la calidad de los mensajes de commit generados por CommitBERT, un modelo de generación de mensajes de commit.`];
    
    let sectionsContent = [
        {
            'title':'¿Qué debo hacer?',
            'titleVariant':'h4',
            'paragraphs':[`Deberás evaluar 3 mensajes de commit seleccionados aleatoriamente, previamente asignados a tu cuenta.`,
                `Tu labor consistirá en leer atentamente cada mensaje de commit y evaluar su calidad. ¿Qué significa eso? Te pediremos que reflexiones sobre aspectos como la claridad, concisión y relevancia del mensaje. A través de tres preguntas específicas, podrás brindarnos tu opinión y ayudarnos a entender si el mensaje de commit cumple con los estándares de calidad requeridos.`,
                `No te preocupes si no tienes experiencia previa en evaluación de mensajes de commit. Proporcionaremos una guía detallada que te explicará los criterios a tener en cuenta y te daremos ejemplos para que te familiarices con el proceso. Lo importante es que seas cuidadoso/a, objetivo/a y aportes tu perspectiva única.`]
        },
        {
            'title':'¿Cómo evaluar?',
            'titleVariant':'h4',
            'paragraphs':[`Aquí te presentamos la guía y consideraciones que debes seguir al momento de evaluar los mensajes. Ahondarás sobre "¿Qué es un buen mensaje de commit?" y como responder a las preguntas que te presentaremos.`]
        },
        {
            'title':'¿Qué es un "buen" commit?',
            'titleVariant':'h5',
            'paragraphs':[`Según “What makes a good commit message?” de Tian et al. un “buen” mensaje de commit es aquel que describe:`,
            `- Qué cambió, es decir, “lo que los cambios le hacen al comportamiento del código”.`,
            `- El porqué de los cambios, es decir, “porqué los cambios eran necesarios”.`]
        },
        
    ];
    
    return (
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center',my:10}}>
            <Box sx={{width:0.80,display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                <Typography sx={{marginBottom:4}} variant='h2'>Generacion Automatica de Mensajes Commit</Typography>
                {introductionParagraphs.map((paragraph)=>{
                    return <Typography sx={{marginBottom:1.5}}>{paragraph}</Typography>
                })}
                <LoadingButton
                    sx={sxButton} variant="contained" onClick={handleFormSubmit}
                    loading={loading}
                    loadingPosition="end"
                >Comenzar la evaluación</LoadingButton>
                {
                    sectionsContent.map((sc)=>{
                        return (<Section sectionContent={sc}/>)
                    })
                }
            </Box>
        </Box>
    );
}

export default Training;