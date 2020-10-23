import React , { Fragment, useState } from 'react'
import { Link , useHistory } from 'react-router-dom'

import { register } from '../api/User'

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
})

const Register = props => {

    const [data,setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })

    const classes = useStyles()
    const history = useHistory()

    const inputs = [
        {
            label: 'First Name',
            type: 'text',
            name: 'firstName',
            value: data.firstName
        },
        {
            label: 'Last Name',
            type: 'text',
            name: 'lastName',
            value: data.lastName
        },
        {
            label: 'Email',
            type: 'email',
            name: 'email',
            value: data.email
        },
        {
            label: 'Contact Number',
            type: 'text',
            name: 'phoneNumber',
            value: data.phoneNumber
        },
        {
            label: 'Password',
            type: 'password',
            name: 'password',
            value: data.password
        },
        {
            label: 'Confirm Password',
            type: 'password',
            name: 'confirmPassword',
            value: data.confirmPassword
        }
    ]

    const handleChange = input => {
        setData({
            ...data,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = async () => {

        if(
            data.firstName === '' ||
            data.lastName === '' ||
            data.email === '' ||
            data.phoneNumber === '' ||
            data.password === '' ||
            data.confirmPassword === '' ||
            data.password !== data.confirmPassword
        ){
            swal('Something Wrong', 'Invalid Data', 'error')
        }else{
            let response = await register(data)

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
            <Typography className={classes.title}>REGISTER</Typography>
            {
                inputs.map((input,id) => <Fragment key={`register_input_${id}`}>
                                            <Typography gutterBottom className={classes.label}>{input.label}</Typography>
                                            <TextField
                                                fullWidth
                                                type={input.type}
                                                className={classes.textField}
                                                autoComplete='off'
                                                variant='outlined'
                                                label={input.label}
                                                name={input.name}
                                                value={input.value}
                                                onChange={handleChange}
                                            />   
                                         </Fragment>)
            }
            <Button
                fullWidth
                className={classes.firstButton}
                onClick={handleSubmit}
            >
                REGISTER
            </Button>
            <Button
                fullWidth
                className={classes.secondButton}
                onClick={() => history.push('/')}
            >
                LOG IN
            </Button>
        </div>
    )
}

export default Register