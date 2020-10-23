import React , { useState } from 'react'
import { useHistory } from 'react-router-dom'

import swal from 'sweetalert'

import { requestResetPassword } from '../api/Auth'

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

const RequestResetPassword = props => {

    const [data,setData] = useState({
        email: '',
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
        if(data.email === ''){
            alert('Invalid Data')
        }else{
            let response = await requestResetPassword(data)

            if(response.status === 200){
                swal('All is Fine', response.message, 'success')
                setData({
                    email: ''
                })
            }else{
                swal('Something Wrong', response.message, 'error')
            }
        }
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>RESET PASSWORD</Typography>
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
            <Button
                fullWidth
                className={classes.firstButton}
                onClick={handleSubmit}
            >
                NEXT
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

export default RequestResetPassword