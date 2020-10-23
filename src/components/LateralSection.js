import React , { useState , Fragment } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'

import {
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'

import { makeStyles , useTheme } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import PersonIcon from '@material-ui/icons/Person'
import ContactsIcon from '@material-ui/icons/Contacts'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}))

const LateralNav = props => {

    const classes = useStyles()    
    const theme = useTheme()
    const history = useHistory()
    
    const [active,setActive] = useState(0)

    const menu = [
        {
            icon: <HomeOutlinedIcon />,
            label: 'Home',
            link: '/home',
        },
        {
            icon: <PersonIcon />,
            label: 'Profile',
            link: '/home/profile'
        },
        {
            icon: <ContactsIcon />,
            label: 'Contacts',
            link: '/home'
        },
        {
            icon: <ExitToAppIcon />,
            label: 'Logout',
            link: '/',
            logout: true
        }        
    ]

    const handleRedirect = (logout,link) => {
        if(logout)
            localStorage.removeItem('access_token')
    
        history.push(link)
    }

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.drawerOpen,
            [classes.drawerClose]: !props.drawerOpen,
            })}
            classes={{
            paper: clsx({
                [classes.drawerOpen]: props.drawerOpen,
                [classes.drawerClose]: !props.drawerOpen,
            }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={props.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    menu.map((option,id) => <ListItem 
                                                    key={`menu_option_${id}`}
                                                    button onClick={() => handleRedirect(option.logout,option.link)}
                                                >
                                                    <ListItemIcon>{option.icon}</ListItemIcon>
                                                    <ListItemText primary={option.label} />
                                                </ListItem>)                
                }                
            </List>
        </Drawer>
    )
}

export default LateralNav