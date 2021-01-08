import React, {useState} from 'react';

import {NavLink} from 'react-router-dom'
import {__CreateUser} from '../services/UserServices'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
}));


const Signup = (props) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [zip, setZip] = useState(90067)
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (passwordOne !== passwordTwo) {
                setError(true)
                setErrorMessage('Your passwords do not match.')
            } else {
                let formData = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: passwordOne,
                    zip: zip
                }
                await __CreateUser(formData)
                props.history.push('/login')
            }
        } catch (error) {
            setError(true)
            setErrorMessage('Server Error, Please try again later.')
            throw error
        }
    }
    console.log(props)
    return (
        <div style={{display: 'flex', alignItems: 'stretch', height: '100%', width: '100%'}}>
            <div style={{
                height: '100%', 
                width:'60%',
                backgroundImage:'url("https://images.unsplash.com/photo-1447012256906-c2ed7aa5632e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=926&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
                    <NavLink to='/' style={{textDecoration: 'none'}}><ArrowBackIosIcon/></NavLink>
                </div>
                <form onSubmit={handleSubmit} className={classes.root} style={{textAlign: 'center', marginTop: '20vh'}}>
                    <TextField onChange={(e) => setFirstName(e.target.value)}id="filled-basic" label="First Name" required variant="filled" />
                    <br/>
                    <TextField onChange={(e) => setLastName(e.target.value)}id="filled-basic" label="Last Name" required variant="filled" />
                    <br/>
                    <TextField onChange={(e) => setEmail(e.target.value)}id="filled-basic" label="Email" required variant="filled" type="email" />
                    <br/>
                    <TextField onChange={(e) => setZip(e.target.value)}id="filled-basic" label="Zip Code" variant="filled" type="number" />
                    <br/>
                    <TextField onChange={(e) => setPasswordOne(e.target.value)}id="filled-basic" label="Password" required variant="filled" type="password" />
                    <br/>
                    <TextField onChange={(e) => setPasswordTwo(e.target.value)}id="filled-basic" label="Confirm Password" required variant="filled" type="password" />
                    <br/>
                    {error ? <p style={{textAlign: 'center', width: '100%'}}>{errorMessage}</p> : <p></p>}
                    <Button type="submit" variant="outlined" size="medium" color="primary" className={classes.margin}>
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup