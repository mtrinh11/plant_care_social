import {connect} from 'react-redux'

import {getWeather} from '../store/actions/WeatherActions'
import {GetUserPlants} from '../store/actions/UserPlantActions'

import weatherIcons from '../styles/icons.json'
import '../styles/WeatherIcons/css/weather-icons.css'
import Typography from '@material-ui/core/Typography';

const state = ({weatherState, userState, userPlantState})=> {
    return {
        weatherState,
        userState,
        userPlantState
    }
}

const actions = (dispatch) => {
    return {
        fetchWeather: (zip) => dispatch(getWeather(zip)),
        fetchUserPlants: (userId) => dispatch(GetUserPlants(userId))
    }
}

const icon = (code) => {
    let prefix = 'wi wi-';
    let icon = weatherIcons[code].icon;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = 'day-' + icon;
    }
    icon = prefix + icon;
    return icon
}

const date = () => {
    let today = new Date()
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = `${days[today.getDay()]} ${today.getDate()} ${months[today.getMonth()]}`
    return date
}

const convertUnixTimestamptoTime = (unixstamp) => {
    let date = new Date(unixstamp * 1000)
    let hours = date.getHours()
    let minutes = '0' + date.getMinutes()
    return `${hours}:${minutes.substr(-2)}`
}

const Profile = (props) => {
    console.log(props)
    if (!props.weatherState.fetched){
        props.fetchWeather(90067)
    }
    if (!props.userPlantState.babies){
        props.fetchUserPlants(props.userState.userId)
    }

    return (
        <div>
            {props.weatherState.fetched ? 
            <div>
                <h1>{props.weatherState.name}, {props.weatherState.sys.country} </h1>
                <h2>{date()}</h2>
                <i className={icon(props.weatherState.description.id)} style={{fontSize: '100px', color: 'green'}}></i>
                <h2>{Math.round(props.weatherState.temp)}°F {(props.weatherState.description.description).replace(/\b\w/g, l => l.toUpperCase())} </h2>
                <h2> 
                    Sunrise: {convertUnixTimestamptoTime(props.weatherState.sys.sunrise)}  
                    Sunset: {convertUnixTimestamptoTime(props.weatherState.sys.sunset)}
                </h2>
            </div>
            : <p>Loading...</p>
            }
            {props.userPlantState.babies ? 
                <div> 
                    {props.userPlantState.babies.map((plant) => 
                        <div> {plant.name} {plant.birthday}</div>
                    )}
                </div>
            : <p> babies are loadin</p>
            }
            
            <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere <a href='/'>ollicitudi</a>sn aliquam ultrices sagittis orci a.
            </Typography>
        </div>
    )
}

export default connect(state, actions)(Profile);