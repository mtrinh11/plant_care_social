import {connect} from 'react-redux'

import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import {__GetUserByEmail, __GetUser} from '../services/UserServices'
import {AddToUserFriends, GetUserFriends, RemoveFromUserFriends} from '../services/FriendsServices'

const state = ({userState}) => { 
    return {userState}
}

const actions = (dispatch) => {
    return {

    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    margin: {
        margin: theme.spacing(1),
    },
  }));

const FriendsFeed = (props) => {
    
    const [searchQuery, setSearchQuery] = useState('')
    const [userSearchResults, setUserSearchResults] = useState([])
    const [userFriends, setUserFriends] = useState(false)
    const [friendData, setFriendData] = useState(false)

    const classes = useStyles();

    console.log(props)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            let formData = {
                email: searchQuery
            }
            let res = await __GetUserByEmail(formData)
            setUserSearchResults(res.data)
        } catch (error) {
            setUserSearchResults([])
            throw error
        }
    }

    const handleAddToFriends = async(e) => {
        try {
            let formData = {
                userId: props.userState.userId,
                friendId: userSearchResults[0].id
            }
            let res = await AddToUserFriends(formData)
            console.log(res)
            fetchUserFriends()
        } catch (error) {
            throw error
        }
    }

    const handleDeleteFromFriends = async(relationId) => {
        try {
            let res = await RemoveFromUserFriends(relationId)
            console.log(res)
            fetchUserFriends()
        } catch (error) {
            throw error
        }
    }

    const fetchUserFriends = async() => {
        try {
            let res = await GetUserFriends(props.userState.userId)
            fetchUserFriendData(res.data)
            setUserFriends(res.data)
        } catch(error) {
            throw error
        }
    }

    const fetchUserFriendData = async(relationshipArray) => {
        try {
            let data = []
            for (let friend of relationshipArray){
                let res = await __GetUser(friend.friendId)
                res["relationshipId"] = friend.id
                data.push(res)
            }
            console.log(data)
            setFriendData(data)
        } catch (error) {
            throw error
        }
    }

    console.log(userFriends)
    if (!userFriends) {
        fetchUserFriends()
    }
    return(
        <div>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                <div className={classes.margin} style={{width: '100%'}}>
                    <TextField
                        id="standard-full-width"
                        label=""
                        style={{ margin: 8 }}
                        placeholder=""
                        helperText="Search for a friend by email "
                        // fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </form>
            { userSearchResults.length ? 
                <div>
                    <p> {userSearchResults[0].firstName} {userSearchResults[0].lastName} {userSearchResults[0].email}</p>
                    <Button 
                        type="submit" 
                        variant="outlined" 
                        size="medium" 
                        color="primary" 
                        className={classes.margin}
                        onClick={handleAddToFriends}
                    >
                        Add To Friends
                    </Button>
                    </div>
                :<p>no result</p>
            }
            <h1>Friends</h1>
            {friendData ? 
             <div> 
                 {friendData.map((friend, index) => (
                     <div key={index}> 
                        {friend.firstName} {friend.lastName} {friend.email}
                        <Button 
                            type="submit" 
                            variant="outlined" 
                            size="medium" 
                            color="primary" 
                            className={classes.margin}
                             onClick={() => handleDeleteFromFriends(friend.relationshipId)}
                        >
                            Remove Friend
                        </Button>
                     </div>
                 ))}
             </div>
             : <p> loading...</p>
            }
        </div>
    )
}

export default connect(state, actions)(FriendsFeed);