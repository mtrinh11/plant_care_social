import {connect} from 'react-redux'

import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import { Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoTitle, InfoSubtitle } from '@mui-treasury/components/info';
import { useTutorInfoStyles } from '@mui-treasury/styles/info/tutor';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import PersonIcon from '@material-ui/icons/Person';

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
    action: {
        backgroundColor: '#fff',
        boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
        '&:hover': {
          backgroundColor: '#fff',
          color: '#000',
        },
    },
  }));

const FriendsFeed = (props) => {
    
    const [searchQuery, setSearchQuery] = useState('')
    const [userSearchResults, setUserSearchResults] = useState([])
    const [userFriends, setUserFriends] = useState(false)
    const [friendData, setFriendData] = useState(false)

    const classes = useStyles();
    const avatarStyles = useDynamicAvatarStyles({ radius: 12, size: 90,  });

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
                    <Row p={1.5} gap={2} bgcolor={'#f5f5f5'} borderRadius={16}>
                            <Item>
                                <Avatar
                                    classes={avatarStyles}
                                    src={<PersonIcon/>}
                                />
                            </Item>
                            <Info position={'middle'} useStyles={useTutorInfoStyles}>
                                <InfoTitle>{userSearchResults[0].firstName} {userSearchResults[0].lastName}</InfoTitle>
                                <InfoSubtitle>{userSearchResults[0].email}</InfoSubtitle>
                            </Info>
                            <Item ml={1} position={'middle'}>
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
                            </Item>
                        </Row>
                    </div>
                :<p>no result</p>
            }
            <h1>Friends</h1>
            {friendData ? 
             <div> 
                 {friendData.map((friend, index) => (
                     
                     <div key={index}> 
                        <Row p={1.5} gap={2} bgcolor={'#f5f5f5'} borderRadius={16}>
                            <Item>
                                <Avatar
                                    classes={avatarStyles}
                                    src={<PersonIcon/>}
                                />
                            </Item>
                            <Info position={'middle'} useStyles={useTutorInfoStyles}>
                                <InfoTitle>{friend.firstName} {friend.lastName}</InfoTitle>
                                <InfoSubtitle>{friend.email}</InfoSubtitle>
                            </Info>
                            <Item ml={1} position={'middle'}>
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
                            </Item>
                        </Row>
                     </div>
                 ))}
             </div>
             : <p> loading...</p>
            }
        </div>
    )
}

export default connect(state, actions)(FriendsFeed);