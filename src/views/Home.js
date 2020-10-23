import React , { Fragment , useState , useEffect } from 'react'
import { Switch , Route , useHistory } from 'react-router-dom'

import Appbar from '../components/Appbar'
import LateralSection from '../components/LateralSection'
import Contacts from '../components/Contacts'
import ContactForm from '../components/ContactForm'
import Profile from './Profile'

import { 
    Typography, 
    Button
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    content: {
        width: '100%',
        flexGrow: 1,        
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
    },
    button: {
        fontSize: '16px',
        fontWeight: '500',
        background: '#0097F6',
        color: '#fff',
        margin: '15px 0 25px 0',
        '&:hover': {
            background: '#0097F6',
        }
    },
    contTitle: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    contForm: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
}))

const Home = props => {

    const classes = useStyles()
    const [drawerOpen,setDrawerOpen] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if(!localStorage.getItem('access_token'))
            history.push('/')
    },[history.location.pathname])

    return (
        <Fragment>
            <Appbar 
                drawerOpen={drawerOpen}
                handleDrawerOpen={() => setDrawerOpen(true)}
            />
            <LateralSection 
                drawerOpen={drawerOpen}
                handleDrawerClose={() => setDrawerOpen(false)}
            />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path='/home' exact>
                        <div className={classes.contTitle}>
                            <Typography className={classes.title}>Contacts</Typography>
                            <Button
                                variant='contained'
                                className={classes.button}
                                onClick={() => history.push('/home/contact')}
                            >
                                ADD CONTANCT
                            </Button>
                        </div>
                        <Contacts />
                    </Route>
                    <Route path='/home/contact' exact >
                        <div className={classes.contForm}>
                            <ContactForm />
                        </div>
                    </Route>
                    <Route path='/home/contact/:id' render={({
                                                        match 
                                                    }) => (
                                                        <div className={classes.contForm}>
                                                            <ContactForm match={match} />
                                                        </div>
                                                    )} />
                    <Route path='/home/profile' exact component={Profile} />
                </Switch>
            </main>
        </Fragment>
    )
}

export default Home