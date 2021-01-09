import {connect} from 'react-redux'

import {getWeather} from '../store/actions/WeatherActions'
import {GetUserPlants, ClearUserPlants, GetUserPlantDetails} from '../store/actions/UserPlantActions'

import weatherIcons from '../styles/icons.json'
import '../styles/WeatherIcons/css/weather-icons.css'
import Typography from '@material-ui/core/Typography';

import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

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
        fetchUserPlants: (userId) => dispatch(GetUserPlants(userId)),
        clearUserPlants: () => dispatch(ClearUserPlants()),
        getUserPlantDisplayData: (userPlants) => dispatch(GetUserPlantDetails(userPlants))
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

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
      margin: 'auto',
      borderRadius: spacing(2), // 16px
      transition: '0.3s',
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      position: 'relative',
      maxWidth: 500,
      marginLeft: 'auto',
      overflow: 'initial',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: spacing(2),
      [breakpoints.up('md')]: {
        flexDirection: 'row',
        paddingTop: spacing(2),
      },
    },
    media: {
      width: '88%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: spacing(-3),
      height: 0,
      paddingBottom: '48%',
      borderRadius: spacing(2),
      backgroundColor: '#fff',
      position: 'relative',
      [breakpoints.up('md')]: {
        width: '100%',
        marginLeft: spacing(-3),
        marginTop: 0,
        transform: 'translateX(-8px)',
      },
      '&:after': {
        content: '" "',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
        borderRadius: spacing(2), // 16
        opacity: 0.5,
      },
    },
    content: {
      padding: 24,
    },
    cta: {
      marginTop: 24,
      textTransform: 'initial',
    },
  }));



const Profile = (props) => {
    const styles = useStyles();

    const {
        button: buttonStyles,
        ...contentStyles
      } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
   
    if (!props.weatherState.fetched) {
        props.fetchWeather(props.userState.zip)
    }
    if (!props.userPlantState.babies) {
        props.fetchUserPlants(props.userState.userId)
    }

    if (props.userPlantState.babies && !props.userPlantState.details) {
        props.getUserPlantDisplayData(props.userPlantState.babies)
    }

    console.log(props)
    return (
        <div>
            {props.weatherState.fetched ? 
            <div>
                <h1>{props.weatherState.name}, {props.weatherState.sys.country} </h1>
                <h2>{date()}</h2>
                <i className={icon(props.weatherState.description.id)} style={{fontSize: '100px', color: '#BCCCCA'}}></i>
                <h2>{Math.round(props.weatherState.temp)}°F {(props.weatherState.description.description).replace(/\b\w/g, l => l.toUpperCase())} </h2>
                <h2> 
                    Sunrise: {convertUnixTimestamptoTime(props.weatherState.sys.sunrise)}  
                    Sunset: {convertUnixTimestamptoTime(props.weatherState.sys.sunset)}
                </h2>
            </div>
            : <p>
                Looks like we're having trouble loading your weather information... <br/>
                This could be one of two reasons:<br/>
                1. Your zip code is entered incorrectly in your Account Settings <br/>
                2. We don't have the weather for that zip code.
              </p>
            }
            {props.userPlantState.details ? 
                <div style={{display: 'grid', gridTemplateColumns: '50% 50%'}}> 
                    {props.userPlantState.babies.map((plant, index) => 
                        <div style={{padding: '10px 0 30px 20px', width: '90%', textAlign: 'center'}} key={index}> 
                        {console.log(plant)}
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia
                                    className={styles.media}
                                    image={
                                        `${'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}`
                                    }
                                />
                                <CardContent>
                                    <TextInfoContent
                                    classes={contentStyles}
                                    overline={`${(new Date(plant.birthday)).toDateString()}`}
                                    heading={`${plant.name}`}
                                    body={
                                        'Git is ang copy of the code and...'
                                    }
                                    />
                                    <Button className={buttonStyles} style={{background: '#BCCCCA', boxShadow: 'none'}}>Edit Plant</Button>
                                </CardContent>
                            </Card>
                        </div>
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