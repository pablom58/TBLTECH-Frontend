import React , { Fragment, useState , useEffect} from 'react'
import { useHistory } from 'react-router-dom'

import { create as createContact , getContact , update } from '../api/Contact'

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
    })

    const classes = useStyles()
    const history = useHistory()

    useEffect(() => {
        if(props.match)
            if(props.match.params.id)
                getContact(props.match.params.id)
                    .then(response => setData({
                        ...data,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        phoneNumber: response.data.phoneNumber
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
    ]

    const handleChange = input => {
        setData({
            ...data,
            [input.target.name]: input.target.value
        })
    }

    const newContact = async () => {
        if(
            data.firstName === '' ||
            data.lastName === '' ||
            data.email === '' ||
            data.phoneNumber === ''
        ){
            alert('Invalid data')
        }else{
            let response = await createContact(data)
            console.log(response)
            if(response.status === 200){
                history.push('/home')
            }else{
                alert(response.message)
            }
        } 
    }

    const updateContact = async () => {
        if(
            data.firstName === '' ||
            data.lastName === '' ||
            data.email === '' ||
            data.phoneNumber === ''
        ){
            alert('Invalid data')
        }else{
            let response = await update({
                contact_id: props.match.params.id,
                ...data
            })
            console.log(response)
            if(response.status === 200){
                history.push('/home')
            }else{
                alert(response.message)
            }
        } 
    }

    const handleSubmit = () => {
        if(props.match){
            if(props.match.params.id){
                updateContact()
            }else{
                newContact()
            }
        }else{
            newContact()
        }            
    }

    return (
        <div className={classes.container}>
            <Typography className={classes.title}>CONTACT DETAILS</Typography>
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