import {connect} from 'react-redux'
import React from 'react';

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
    console.log(props)

    const classes = useStyles();

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('sub')
        try {

        } catch (error) {
            throw error
        }
    }

    return (
        <div>
            {props.userState.authenticated ? 
                <div>
                    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                        <h3>First Name:</h3>
                        <TextField id="outlined-basic" defaultValue={props.userState.firstName} variant="outlined" />
                        <h3>Last Name:</h3>
                        <TextField id="outlined-basic" defaultValue={props.userState.lasttName} variant="outlined" />
                        <h3>Email:</h3>
                        <TextField id="outlined-basic" defaultValue={props.userState.email} type='email' variant="outlined" />
                        <h3>Zip:</h3>
                        <TextField id="outlined-basic" defaultValue={props.userState.zip} type='number' variant="outlined" />
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