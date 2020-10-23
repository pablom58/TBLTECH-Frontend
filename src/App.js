import React from 'react'
import { Switch , Route } from 'react-router-dom' 
import { makeStyles } from '@material-ui/core/styles'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'
import RequestResetPassword from './views/RequestResetPassword'
import ResetPassword from './views/ResetPassword'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        background: '#FCFCFC',
        padding: '15px'
    }
})

const App = props => {
    
    const classes = useStyles()

    return (
        <div className={classes.container} >
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' exact component={Register} />
                <Route path='/home' component={Home} />
                <Route path='/password/request/reset' exact component={RequestResetPassword} />
                <Route path='/password/reset/:hash' render={({
                                                        match 
                                                    }) => (
                                                        <ResetPassword match={match} />
                                                    )} />
            </Switch>
        </div>
    )
}

export default App