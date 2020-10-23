import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const App = props => {
    
    const classes = useStyles()

    return (
        <div className={classes.container} >
            
        </div>
    )
}

export default App