import React , { useState } from 'react'
import { Link , useHistory } from 'react-router-dom'

import { login } from '../api/User'

import {
    TextField,
    Typography,
    Button
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        width: '500px',
        maxWidth: '90%',
        background: '#fff',
        padding: '25px',
        borderRadius: '13px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 5px 10px rgba(0,0,0,.12)'
    },
    title: {
        fontSize: '25px',
        fontWeight: 'bold',
        marginBottom: '25px'
    },
    label: {
        textAlign: 'left',
        fontWeight: '500',
        fontSize: '16px'
    },
    textField: {
       marginBottom: '16px'
    },
    firstButton: {
        fontSize: '16px',
        fontWeight: 'bold',
        background: '#0097F6',
        color: '#fff',
        marginTop: '15px',
        '&:hover': {
            background: '#0097F6',
        }
    },
    secondButton: {
        fontSize: '16px',
        fontWeight: '500',
        background: '#FCFCFC',
        color: '#000',
        marginTop: '15px',
        '&:hover': {
            background: '#FCFCFC',
        }
    },
    contLink: {
        width: '100%',
        textAlign: 'right',
        margin: '15px 0',
        '& a': {
            textAlign: '14px',
            fontWeight: '400',
            color: "#272727",
            textDecoration: 'none'
        },
        '& a:hover': {
            textDecoration: 'none'
        }
    }
})

const Login = props => {

    const [data,setData] = useState({
        email: '',
        password: ''
    })

    const classes = useStyles()
    const history = useHistory()

    const handleChange = input => {
        setData({
            ...data,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = async () => {
        if(data.email === '' || data.password === ''){
            swal('Something Wrong', 'Invalid Data', 'error')
        }else{
            let response = await login(data)

            if(response.status === 200){
                localStorage.setItem('access_token',response.data.token)
                history.push('/home')
            }else{
                swal('Something Wrong', response.message, 'error')
            }
        }
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>WELCOME</Typography>
            <Typography gutterBottom className={classes.label}>Email</Typography>
            <TextField
                fullWidth
                className={classes.textField}
                autoComplete='off'
                variant='outlined'
                label='Email'
                name='email'
                value={data.email}
                onChange={handleChange}
            />
            <Typography gutterBottom className={classes.label}>Password</Typography>
            <TextField
                fullWidth
                className={classes.textField}
                autoComplete='off'
                type='password'
                variant='outlined'
                label='Password'
                name='password'
                value={data.password}
                onChange={handleChange}
            />
            <div className={classes.contLink}>
                <Link to='/password/request/reset'>Forgot Password ?</Link>
            </div>
            <Button
                fullWidth
                className={classes.firstButton}
                onClick={handleSubmit}
            >
                LOG IN
            </Button>
            <Button
                fullWidth
                className={classes.secondButton}
                onClick={() => history.push('/register')}
            >
                REGISTER
            </Button>
        </div>
    )
}

export default Login