import React , { useState , useEffect } from 'react'
import { Link , useHistory } from 'react-router-dom'
import swal from 'sweetalert'

import { getPage as getContactPage , remove as removeContact , getContactFilter } from '../api/Contact'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TextField,
    Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import CreateIcon from '@material-ui/icons/Create'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '400px',
        minHeight: '400px',
    },
    tableCont: {
        width: '90%',
        maxWidth: '90%',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto'
    },
    paginationButton: {
        width: '42px',
        height: '42px',
        background: '#0097F6',
        color: '#fff',
        borderRadius: '6px',
        fontSize: '18px',
        fontWeight: '400',
        margin: '0 9px',
        border: 'none',
        '&:hover': {
            background: '#0097F6',
            color: '#fff',
        }
    },
    pagination: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: '25px'
    },
    paginationPage: {
        borderRadius: '6px',
        border: '1px solid #DBDBDB',
        width: '42px',
        height: '42px',
        fontSize: '20px',
        fontWeight: '400',
        color: '#0097F6',
        textAlign: 'center',
        lineHeight: '42px',
        margin: '0 4.5px'
    },
    paginationTotalPages: {
        fontSize: '18px',
        fontWeight: '400',
        color: '#0097F6',
        height: '42px',
        textAlign: 'center',
        lineHeight: '42px',
        margin: '0 4.5px'
    },
    filterCont: {
        width: '100%',
        margin: '25px 0'
    }
})

const Contacts = props => {

    const classes = useStyles()

    const [filter,setFilter] = useState('')

    const [data,setData] = useState({
        pages: 1,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        contacts: []
    })

    const headers = ['First Name','Last Name','Email','Contact Number','']

    const getPage = page => {
        if(localStorage.getItem('access_token'))
            getContactPage(page)
                .then(response => setData({
                    ...data,
                    pages: response.data.pages,
                    nextPage: response.data.nextPage,
                    prevPage: response.data.prevPage,
                    currentPage: response.data.currentPage,
                    contacts: response.data.contacts
                }))
                .catch(error => {
                    swal('Something Wrong', error.message, 'error')
                    console.error(error)
                })       
    }

    const getFilterPage = (page,filter) => {
        getContactFilter(page,filter)
            .then(response => setData({
                ...data,
                pages: response.data.pages,
                nextPage: response.data.nextPage,
                prevPage: response.data.prevPage,
                currentPage: response.data.currentPage,
                contacts: response.data.contacts
            }))
            .catch(error => {
                swal('Something Wrong', error.message, 'error')
                console.error(error)
            })  
    }

    useEffect(() => {
        getPage(1)
    },[])

    const prevPage = () => {
        if(data.prevPage >= 1)
            if(filter === ''){
                getPage(data.prevPage)
            }else{
                getFilterPage(data.prevPage,filter)
            }
    }

    const nextPage = () => {
        if(data.nextPage <= data.pages){
            if(filter === ''){
                getPage(data.nextPage)
            }else{
                getFilterPage(data.nextPage,filter)
            }
        }            
    }

    const handleDelete = async contact_id => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Contact!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(willDelete => {
            if(willDelete)
                removeContact(contact_id)
                    .then(response => {
                        swal('All is fine', response.message, 'success')
                        getPage(data.currentPage)
                    })
                    .catch(error => swal('Something Wrong', error.message, 'error'))
        })            
    }

    const handleFilter = input => {
        setFilter(input.target.value)
        if(input.target.value === ''){
            getPage(1)
        }else{
            getFilterPage(1,input.target.value)
        }        
    }

    return (
        <div className={classes.tableCont} >  
            <div className={classes.filterCont}>
                <Typography gutterBottom variant='h5'>Filter by Email</Typography>
                <TextField 
                    fullWidth
                    variant='outlined'
                    label='Filter'
                    value={filter}
                    onChange={handleFilter}
                />
            </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" style={{width: '100%'}}>
                    <TableHead>
                        <TableRow>
                        {
                            headers.map((header,id) => <TableCell
                                                            key={`head_${id}`}
                                                            align='center'
                                                            style={{fontWeight: 'bold'}}
                                                        >
                                                            {header}
                                                        </TableCell>)
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.contacts.map((contact,id) => <TableRow
                                                            key={`contact_${id}`}
                                                            align='center'
                                                        >
                                                            <TableCell align='center' >{contact.firstName}</TableCell>
                                                            <TableCell align='center' >{contact.lastName}</TableCell>
                                                            <TableCell align='center' >{contact.email}</TableCell>
                                                            <TableCell align='center' >{contact.phoneNumber}</TableCell>
                                                            <TableCell align='center' style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                                                                <Link to={`/home/contact/${contact._id}`}><IconButton><CreateIcon /></IconButton></Link>
                                                                <IconButton onClick={() => handleDelete(contact._id)}><DeleteOutlineIcon /></IconButton>
                                                            </TableCell>
                                                        </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={classes.pagination} >
                <button className={classes.paginationButton} onClick={prevPage} >{ '<' }</button>
                <p className={classes.paginationPage} >{data.currentPage}</p>
                <p className={classes.paginationTotalPages} >De { data.pages }</p>
                <button className={classes.paginationButton} onClick={nextPage} >{ '>' }</button>
            </div>
        </div>
    )
}

export default Contacts