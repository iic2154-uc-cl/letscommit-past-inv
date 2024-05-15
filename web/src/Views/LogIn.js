import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Typography from "@mui/material/Typography";
import Container from "../Components/Container";
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';

function LogIn() {
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
    const host = "http://aicommit.ing.puc.cl"
    // const host = "http://127.0.0.1:5000"
    // const host = "http://localhost:8080"
    const urlLogIn = host + "/api/users/login"
    const handleFormSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const loginGetOptions = {
            method: 'post',
            maxBodyLength: Infinity,
            url: urlLogIn,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(formValues)
        }
        console.log(loginGetOptions);
        axios.request(loginGetOptions)
            .then(function (response) {
                if (response.status == 200) {
                    setLoading(false);
                    localStorage.setItem('token',response.data.token);
                    navigate('/message');//,{'state':formValues});
                }
            })
            .catch(function (error) {
                if (error.response) {
                    setLoading(false);
                    if (error.response.status == 401){
                        setErrorMessage(`Error: ${error.response.data.message}`);
                    }
                    if (error.response.status == 500){
                        setErrorMessage(`Error: ${error.response.data.message}`);
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
                            Iniciar sesión
                        </Typography>
                        <TextField name='email' onChange={handleChange} value={formValues.email} sx={sxTextField} id="bce-email" label="Email" variant="outlined"/>
                        <FormControl sx={sxTextField} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        >Iniciar sesión</LoadingButton>
                        <Link href="/signup" variant='body2' sx={{marginTop:3}}>
                        ¿No tienes una cuenta? Registrate aquí
                        </Link>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default LogIn;