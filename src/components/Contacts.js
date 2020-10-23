import React , { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getPage as getContactPage , remove as removeContact } from '../api/Contact'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Button,
    IconButton
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
        fontSize: '32px',
        fontWeight: '400',
        margin: '0 9px',
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
})

const Contacts = props => {

    const classes = useStyles()
    const [data,setData] = useState({
        pages: 1,
        currentPage: 1,
        nextPage: 2,
        prevPage: 0,
        contacts: []
    })
    const [page,setPage] = useState(1)

    const headers = ['First Name','Last Name','Email','Contact Number','']

    const getPage = page => {
        getContactPage(page)
            .then(response => setData({
                ...data,
                pages: response.data.pages,
                nextPage: response.data.nextPage,
                prevPage: response.data.prevPage,
                currentPage: response.data.currentPage,
                contacts: response.data.contacts
            }))
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getPage(1)
    },[])

    const prevPage = () => {
        if(data.prevPage >= 1)
            getPage(data.prevPage)
    }

    const nextPage = () => {
        if(data.nextPage <= data.pages)
            getPage(data.nextPage)
    }

    const handleDelete = async contact_id => {
        if(confirm('Are you sure?'))
            removeContact(contact_id)
                .then(response => getPage(data.currentPage))
                .catch(error => console.error(error))
    }

    return (
        <div className={classes.tableCont} >  
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
                <Button className={classes.paginationButton} onClick={prevPage} >{ '<' }</Button>
                <p className={classes.paginationPage} >{data.currentPage}</p>
                <p className={classes.paginationTotalPages} >De { data.pages }</p>
                <Button className={classes.paginationButton} onClick={nextPage} >{ '>' }</Button>
            </div>
        </div>
    )
}

export default Contacts

// export default function StickyHeadTable() {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper className={classes.root}>
      
      
//     </Paper>
//   );