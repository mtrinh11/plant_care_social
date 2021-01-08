import {connect} from 'react-redux'
import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const state = ({userState}) => {
    return {userState}
}

const actions = (dispatch) => {
    return {

    }
}

const AccountSettings = (props) => {
    
    const classes = useStyles();
    const [firstNameInput, setFirstNameInput] = useState(props.userState.firstName)
    const [lastNameInput, setLastNameInput] = useState(props.userState.lastName)
    const [emailInput, setEmailInput] = useState(props.userState.email)
    const [zipInput, setZipInput] = useState(props.userState.zip)

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(firstNameInput,lastNameInput,emailInput,zipInput)
        try {
            let formData = {
                firstName: firstNameInput,
                lastName: lastNameInput,
                zip: zipInput,
                email: emailInput
            }
            //send it to services
        } catch (error) {
            throw error
        }
    }

    // console.log(props)
    return (
        <div>
            {props.userState.authenticated ? 
                <div>
                    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                        <h3>First Name:</h3>
                        <TextField 
                            id="outlined-basic" 
                            defaultValue={props.userState.firstName} 
                            variant="outlined" 
                            onChange={(e) => setFirstNameInput(e.target.value)}
                        />
                        <h3>Last Name:</h3>
                        <TextField 
                            id="outlined-basic" 
                            defaultValue={props.userState.lastName} 
                            variant="outlined" 
                            onChange={(e) => setLastNameInput(e.target.value)}
                        />
                        <h3>Email:</h3>
                        <TextField 
                            id="outlined-basic" 
                            defaultValue={props.userState.email} 
                            type='email' 
                            variant="outlined" 
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <h3>Zip:</h3>
                        <TextField 
                            id="outlined-basic" 
                            defaultValue={props.userState.zip} 
                            type='number' 
                            variant="outlined" 
                            onChange={(e) => setZipInput(e.target.value)}
                        />
                        <br/>
                        <Button type="submit" variant="outlined" size="medium" color="primary" className={classes.margin}>
                            Save Changes
                        </Button>
                    </form>
                </div>
                : <p>Loading</p>
            }
        </div>
    )
}

export default connect(state,actions)(AccountSettings);