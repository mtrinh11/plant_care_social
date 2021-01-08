import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {__LoginUser} from '../services/UserServices'
import {connect} from 'react-redux'
import {loginUser} from '../store/actions/UserActions'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const state = ({userState, searchState}) => {
    return {
        userState,
        searchState
    }
}

const actions = (dispatch) => {
    return {
        login: (data) => dispatch(loginUser(data)),
    }
}

const Signin = (props) => {
    const classes = useStyles();

    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            let formData = {
                email: inputEmail,
                password: inputPassword
            }
            let res = await __LoginUser(formData)
            props.login(res.data.user)
            props.history.push('/profile')
        } catch (error) {
            setError(true)
            setErrorMessage('Error Logging In. Please try again.')
            throw error
        }
    }


    return (
        <div style={{display: 'flex', alignItems: 'stretch', height: '100%', width: '100%'}}>
            <div 
                style={{
                    height: '100%', 
                    width:'60%',
                    backgroundImage:'url("https://images.unsplash.com/photo-1455793222120-98f37a8d4ede?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
            </div>

            <div 
                style={{
                    height: '100%', 
                    width:'40%'
                }}
            >
                <div style={{margin: '20px'}}>
                    <NavLink to='/' style={{textDecoration: 'none', color: 'black'}}><ArrowBackIosIcon/></NavLink>
                </div>
                <form onSubmit={handleSubmit} className={classes.root} style={{textAlign: 'center', marginTop: '20vh'}}>
                    <TextField id="filled-basic" label="Email" required variant="filled" type="email" onChange={(e) => setInputEmail(e.target.value)}/>
                    <br/>
                    <TextField id="filled-basic" label="Password" required variant="filled" type="password" onChange={(e) => setInputPassword(e.target.value)}/>
                    <br/>
                    {error ? <p style={{textAlign: 'center', width: '100%'}}>{errorMessage}</p> : <p></p>}
                    <Button type="submit" variant="outlined" size="medium" color="primary" className={classes.margin}>
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default connect(state, actions)(Signin)