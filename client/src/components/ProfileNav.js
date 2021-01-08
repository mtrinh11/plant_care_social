import React, {useState} from 'react';
import {connect} from 'react-redux'

import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import EcoIcon from '@material-ui/icons/Eco';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';

import {getSearchResults, clearSearchResults} from '../store/actions/SearchActions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'flex',
    backgroundColor: '#BCCCCA'
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  searchBar: {
    flexGrow: 1,
    textAlign: 'right'
  }
}));

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& label': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
    '& .MuiInputBase-root': {
      color: 'black',
    },
  },
})(TextField);

const state = ({userState, searchState}) => {
  return {
    userState,
    searchState
  }
}

const actions = (dispatch) => {
  return {
    fetchSearch: (query) => dispatch(getSearchResults(query)),
    clearSearch: () => dispatch(clearSearchResults())
  }
}


const ProfileNav = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const signout = () => {
    localStorage.clear()
    props.history.push('/')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    try {
      props.clearSearch()
      props.fetchSearch(searchQuery)
      props.history.push('/search')
    } catch (error) {
      throw error
    }
  }
  
  console.log(props)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{color: '#434343'}}>
            Hello, {props.userState.firstName}!
          </Typography>
          <form className={classes.searchBar} noValidate onSubmit={handleSearchSubmit}>
            <CssTextField
              label="Search for Plants..."
              variant="outlined"
              id="custom-css-outlined-input"
              placeholder=' ie. Coconut Palm'
              onChange={(e) => setSearchQuery(e.target.value)}
              size='small'
            />
          </form>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <p> plants</p>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => props.history.push('/profile')}>
            <ListItemIcon> <HomeIcon /> </ListItemIcon>
            <ListItemText> Home </ListItemText>
          </ListItem>
          <ListItem button onClick={() => props.history.push('/plantchildren')}>
            <ListItemIcon> <EcoIcon /> </ListItemIcon>
            <ListItemText> Your Plants </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <ListItem button onClick={() => props.history.push('/friends')}>
            <ListItemIcon> <PeopleIcon  /> </ListItemIcon>
            <ListItemText> Friends </ListItemText>
          </ListItem>
        <Divider />
        <List>
          <ListItem button onClick={() => props.history.push('/profile/settings')}>
            <ListItemIcon> <SettingsIcon /> </ListItemIcon>
            <ListItemText> Account Settings </ListItemText>
          </ListItem>
          <ListItem button onClick={signout}>
            <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
            <ListItemText> Sign Out </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default connect(state, actions)(ProfileNav)