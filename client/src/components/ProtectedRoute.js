import {connect} from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

const state = ({userState}) => {
    return {
        userState
    }
}

const actions = (dispatch) => {
    return {

    }
}

const ProtectedRoute = ({userState, component:Component, ...rest}) => 
    userState.authenticated ? (
        <Route {...rest} component={Component}>
        </Route>
    ) : (
        <Redirect to="/" />
    )        


export default connect(state, actions)(ProtectedRoute);