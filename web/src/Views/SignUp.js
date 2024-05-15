import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Typography from "@mui/material/Typography";
import Container from "../Components/Container";
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';

function SignUp() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
        }));
        setErrorMessage(null);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // const host = "http://localhost:5000"
    const host = "http://aicommit.ing.puc.cl"
    const urlLogIn = host + "/api/users/login"
    const urlSignUp = host + "/api/users/signup"
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios.post(urlSignUp, formValues)
            .then(function (response) {
                if (response.status == 201) {
                    const loginGetOptions = {method:'GET',url:urlLogIn,body:formValues}
                    setLoading(false);
                    axios.post(urlLogIn,formValues)
                        .then(function (response) {
                            if (response.status == 200) {
                                navigate('/training');//,{'state':formValues});
                                setLoading(false);
                                localStorage.setItem('token',response.data.token);
                            }
                        })
                        .catch(function (error) {
                            if (error.response) {
                                setLoading(false);
                                if (error.response.status == 500)
                                {
                                    console.log(error.response.data);
                                    setErrorMessage(`Error: ${error.response}`);
                                } 
                                if (error.response.status == 401){
                                    console.log(error.response.data);
                                    setErrorMessage("Error: Credenciales incorrectos.");
                                }
                            }
            });
                }
            })
            .catch(function (error) {
                if (error.response) {
                    setLoading(false);
                    if (error.response.status == 409)
                    {
                        console.log(error.response.data);
                        setErrorMessage(`Error: ${error.response.data.message}`);
                    } 
                    if (error.response.status == 401){
                        console.log(error.response.data);
                        setErrorMessage("Error: Credenciales incorrectos.");
                    }
                }
            });
    }

    let sxTextField = {marginTop:2, width:0.75}
    let sxButton = {marginTop:2, width:0.75, textTransform:'none'}
    let alert = null;
    if (errorMessage != null){
        alert = (<Alert sx={{marginTop:2, width:0.70}} severity="error">{errorMessage}</Alert>)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection:'column', alignItems: 'center',marginTop:20}}>
            <Box sx={{width:0.35,display: 'flex', flexDirection:'column', alignItems: 'center'}}>
                <Container>
                    <Box sx={{width:1, display:'flex', flexDirection:'column', alignItems: 'center', paddingTop:3, paddingBottom:8}}>
                        <Typography variant='h6' color="">
                            Registro
                        </Typography>
                        <TextField name='email' onChange={handleChange} value={formValues.email} sx={sxTextField} id="bce-email" label="Email" variant="outlined"/>
                        <FormControl sx={sxTextField} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                name='password'
                                value={formValues.password}
                                onChange={handleChange}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {alert}
                        <LoadingButton
                        sx={sxButton} variant="contained" onClick={handleFormSubmit}
                        loading={loading}
                        loadingPosition="end"
                        >Registrarme</LoadingButton>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default SignUp;