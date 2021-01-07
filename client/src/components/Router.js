import {Switch, Route} from 'react-router-dom'
import {useEffect} from 'react'
import {connect} from 'react-redux'

import Homepage from './Homepage';
import Signin from'./Signin';
import Signup from './Signup';
import Profile from './Profile'
import ProtectedRoute from './ProtectedRoute'
import ProfileNav from './ProfileNav'
import SearchResults from './SearchResults'
import SpecificSpecies from './SpecificSpecies'
import UserPlants from './UserPlants'

import { __CheckSession } from '../services/UserServices'
import {clearUser, loginUser} from '../store/actions/UserActions'

const state = ({userState}) => {
    return {
        userState
    }
}

const actions = (dispatch) => {
    return {
        resetUser: () => dispatch(clearUser()),
        setUser: (data) =>dispatch(loginUser(data))
    }
}

const Router = (props) => {

    useEffect(() => {
        verifyTokenValid();
    }, [])

    const verifyTokenValid = async () => {
        const token = localStorage.getItem('token')
        if (token) {
          try {
            const session = await __CheckSession(token)
            props.setUser(session.data.user)
          } catch (error) {
            props.resetUser()
            localStorage.clear()
          }
        }
    }

    return (
        <Switch>
            <Route
                exact
                path='/'
                component={Homepage}
            />
            <Route 
                path='/register'
                component={Signup}
            />
            <Route 
                path='/login'
                component={Signin}
            />
            <ProtectedRoute 
                exact 
                path='/profile'
                component={(props) => (
                    <ProfileNav {...props}>
                        <Profile/>
                    </ProfileNav>
                )}
            />
            <ProtectedRoute 
                exact 
                path='/search'
                component={(props) => (
                    <ProfileNav {...props}>
<<<<<<< HEAD
                        <SearchResults {...props}/>
                    </ProfileNav>
                    )}
            />
            <ProtectedRoute 
                exact 
                path='/search/species/:id'
                component={(props) => (
                    <ProfileNav {...props}>
                        <SpecificSpecies/>
                    </ProfileNav>
                    )}
            />
            <ProtectedRoute 
                exact 
                path='/plantchildren'
                component={(props) => (
                    <ProfileNav {...props}>
                        <UserPlants/>
=======
                        <SearchResults />
>>>>>>> 7d569d8b33b38b9c87bb1e1b760efbc1bbefc6a7
                    </ProfileNav>
                    )}
            />
        </Switch>
    )
}

export default connect(state, actions)(Router);