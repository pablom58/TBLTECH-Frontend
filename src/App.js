import React from 'react'
import { Switch , Route } from 'react-router-dom' 
import { makeStyles } from '@material-ui/core/styles'

import Login from './views/Login'
import Register from './views/Register'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FCFCFC',
        minHeight: '100vh',
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
            </Switch>
        </div>
    )
}

export default App