import React , { useState , useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

import { resetPassword } from '../api/Auth'

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
})

const ResetPassword = props => {

    const [data,setData] = useState({
        password: '',
        confirmPassword: '',
    })

    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        if(props.match)
            if(!props.match.params.hash){
                alert('Something Wrong')
                history.push('/')
            }                
    },[])

    const handleChange = input => {
        setData({
            ...data,
            [input.target.name]: input.target.value
        })
    }

    const handleSubmit = async () => {
        if(props.match)
            if(props.match.params.hash)
                if(data.password === '' || data.confirmPassword === '' || data.password !== data.confirmPassword){
                    swal('Something Wrong', 'You have to provide all the data and match the password with the confirm password', 'error')
                }else{
                    let response = await resetPassword({
                        hash: props.match.params.hash,
                        password: data.password
                    })
                    if(response.status === 200){
                        swal('All is Fine',response.message, 'success')
                        history.push('/')
                    }else{
                        swal('Something Wrong',response.message, 'error')
                    }
                }
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>RESET PASSWORD</Typography>
            <Typography gutterBottom className={classes.label}>Password</Typography>
            <TextField
                fullWidth
                type='password'
                className={classes.textField}
                autoComplete='off'
                variant='outlined'
                label='Password'
                name='password'
                value={data.password}
                onChange={handleChange}
            />
            <Typography gutterBottom className={classes.label}>Confirm Password</Typography>
            <TextField
                fullWidth
                className={classes.textField}
                autoComplete='off'
                type='password'
                variant='outlined'
                label='Confirm Password'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
            />
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

export default ResetPassword