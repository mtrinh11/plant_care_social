import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const Homepage = (props) => {
    const classes = useStyles();
    console.log(props)
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%', width: '100%'}}>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: "url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div 
                    style={{
                        marginTop: '60vh',
                        marginLeft: '',
                        textAlign: 'center'
                    }}
                >
                    <h1>Welcome to Florista</h1>
                    <Button 
                        variant="outlined" 
                        size="large" 
                        color="primary" 
                        className={classes.margin}
                        onClick={() => props.history.push('/login')}
                    >
                        Sign In
                    </Button>
                    <Button 
                        variant="outlined" 
                        size="large" 
                        color="primary" 
                        className={classes.margin}
                        onClick={() => props.history.push('/register')}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Homepage;