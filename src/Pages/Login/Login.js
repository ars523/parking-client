import React, { useContext } from 'react';
import { Button, Card, Grid, Stack, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik"
import * as yup from "yup"
import { authContext } from '../../context/authContext';
import Loader from '../../components/Loader/Loader';

const Login = () => {
    const navigate = useNavigate();
    const { handleAuthDataSubmit, authState } = useContext(authContext)
    const {isLoading} = authState
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email address").required("Required"),
            password: yup.string().min(6, "Invalid password").required("Required"),
        }),

        onSubmit: (values) => {
            handleAuthDataSubmit(values, 'signin')
        }
    })
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = formik
    if(isLoading){
        return <Loader/>
    }

    return (
        <Box
            componant='div'
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Stack
                justifyContent='center'
                alignItems='center'
                sx={{ width: '600px' }}>
                <Card
                    sx={{
                        padding: '20px',
                        border: '1px solid black'
                    }}
                >
                    <Typography
                        variant='h5'
                        sx={{
                            pb: '10px',
                            color: '#13C33E'
                        }}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant='standard'
                                    fullWidth
                                    placeholder='Email'
                                    required
                                    type='email'
                                    label="Email"
                                    name='email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    error={touched.email && errors.email?.length > 0}
                                    helperText={touched.email && errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='password'
                                    variant='standard'
                                    fullWidth
                                    placeholder='Password'
                                    name='password'
                                    required
                                    label="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={touched.password && errors.password?.length > 0}
                                    helperText={touched.password && errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant='contained'
                                    fullWidth
                                    type='submit'
                                    sx={{ backgroundColor: '#13C33E' }}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='center'
                                >
                                    <Typography
                                        variant='subtitle1'
                                    >
                                        Don't have an account
                                    </Typography>
                                    <Button
                                        value='create'
                                        onClick={() => navigate('/register')}>
                                        Create an account
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Card>
            </Stack>
        </Box>
    );
};

export default Login;