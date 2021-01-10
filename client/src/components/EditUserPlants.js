import React, {useState} from 'react'
import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {GetOnePlantChild, UpdatePlantChild} from '../services/UserPlantServices'
import {ClearUserPlants, ClearUserPlantsDetails} from '../store/actions/UserPlantActions'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
}));

const state = () => {
    return {}
}

const actions = (dispatch) => {
    return {
        clearUserPlants: () => dispatch(ClearUserPlants()),
        clearUserPlantsDetails: () => dispatch(ClearUserPlantsDetails())
    }
}

const EditUserPlants = (props) => {
    const classes = useStyles();
    const [nameInput, setNameInput] = useState(false)
    const [birthdayInput, setBirthdayInput] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchChildData = async() => {
        try {
            let res = await GetOnePlantChild(props.match.params.id)
            setNameInput(res.name)
            setBirthdayInput(res.birthday)
            setLoading(false)
        } catch (error) {
            throw error
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            let formData = {
                name: nameInput,
                birthday: birthdayInput+'T00:00:00'
            }
            await UpdatePlantChild(props.match.params.id, formData)

            await props.clearUserPlants()
            await props.clearUserPlantsDetails()
            props.history.push('/profile')
        } catch (error) {
            throw error
        }
    }

    if (!nameInput || !birthdayInput){
        fetchChildData()
    }

    console.log(props, birthdayInput)
    return (
        <div>
            { loading ?
                <p> Loading...</p>
                :
                <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
                    <h3>Name:</h3>
                    <TextField 
                        id="outlined-basic" 
                        defaultValue={nameInput} 
                        variant="outlined" 
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                    <h3>Birthday:</h3>
                    <TextField 
                        id="outlined-basic" 
                        defaultValue={birthdayInput.substring(0, 10)} 
                        variant="outlined" 
                        type='date'
                        onChange={(e) => setBirthdayInput(e.target.value)}
                    />
                    <br/>
                    <Button type="submit" variant="outlined" size="medium" color="primary" className={classes.margin}>
                        Save Changes
                    </Button>
                </form>
            }
        </div>
    )
}

export default connect(state, actions)(EditUserPlants);