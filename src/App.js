import React from 'react'
import { Switch , Route } from 'react-router-dom' 
import { makeStyles } from '@material-ui/core/styles'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'

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
            </Switch>
        </div>
    )
}

export default App