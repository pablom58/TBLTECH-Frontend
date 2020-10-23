import React from 'react'
import clsx from 'clsx'

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import MenuIcon from '@material-ui/icons/Menu'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
}))

const Appbar = props => {

    const classes = useStyles()

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: props.drawerOpen,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={props.handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                    [classes.hide]: props.drawerOpen,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    TBL TECH CONTACTS
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar