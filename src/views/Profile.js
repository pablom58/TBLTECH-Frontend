import React , { Fragment, useState , useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

import { getUserInfo , updateUser } from '../api/User'

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
        padding: '25px 15px',
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
        marginBottom: '25px',
        textAlign: 'center'
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
})

const ContactForm = props => {

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

    useEffect(() => {
        if(localStorage.getItem('access_token'))
            getUserInfo()
                .then(response => setData({
                    ...data,
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    email: response.data.user.email,
                    phoneNumber: response.data.user.phoneNumber
                }))
                .catch(error => console.log(error))                
    },[])

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
        },
    ]

    const handleChange = input => {
        setData({
            ...data,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = () => {
        if((data.password !== '' && (data.confirmPassword === '' || data.password !== data.confirmPassword)) || data.firstName === '' || data.lastName === '' || data.email === '' || data.phoneNumber === ''){
            swal('Something Wrong', 'You have to provide all the data, if you are changing your password please verify that the password and confirm password fields are the same', 'error')
        }else{
            updateUser(data)
                .then(response => {
                    swal('All is Fine', response.message, 'success')
                    setData({
                        ...data,
                        password: '',
                        confirmPassword: ''
                    })
                })
                .catch(error => swal('Something Wrong', error.message, 'error'))
        }        
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>USER DETAILS</Typography>
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
                SAVE
            </Button>
        </div>
    )
}

export default ContactForm