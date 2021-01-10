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
            <div style={{width: '100%', height: '200px', textAlign: 'center'}}>
                <div style={{marginTop: '80px'}}> 
                    <div style={{display: 'inline-block', marginRight: '40px'}}> 
                        <h1 style={{fontSize: '3em'}}>{props.weatherState.name}, {props.weatherState.sys.country} </h1>
                        <h2 style={{fontSize: '2em'}}> {Math.round(props.weatherState.temp)}°F {(props.weatherState.description.description).replace(/\b\w/g, l => l.toUpperCase())} </h2>
                    </div>
                    <div style={{display: 'inline-block', marginRight: '40px'}}> 
                    <i className={icon(props.weatherState.description.id)} style={{fontSize: '180px', color: '#b1dbb8'}}></i>
                    </div>
                    <div style={{display: 'inline-block'}}> 
                        <h2 style={{fontSize: '2em'}}>{date()}</h2>
                        <h2> 
                            Sunrise: {convertUnixTimestamptoTime(props.weatherState.sys.sunrise)} <br/> 
                            Sunset: {convertUnixTimestamptoTime(props.weatherState.sys.sunset)}
                        </h2>
                    </div>    
                </div>           
            </div>
            : <p>
                Looks like we're having trouble loading your weather information... <br/>
                This could be one of two reasons:<br/>
                1. Your zip code is entered incorrectly in your Account Settings <br/>
                2. We don't have the weather for that zip code.
              </p>
            }
            <br/> <br/> <br/> <br/>
            {props.userPlantState.details ? null : <p>Images are loading...</p>  }
            {props.userPlantState.babies ? 
                <div style={{display: 'grid', gridTemplateColumns: '50% 50%'}}> 
                    {props.userPlantState.babies.map((plant, index) => 
                        <div style={{padding: '10px 0 30px 20px', width: '90%', textAlign: 'center'}} key={index}> 
                        {console.log(plant)}
                            <Card className={cx(styles.root, shadowStyles.root)}>
                                <CardMedia
                                    className={styles.media}
                                    image={ props.userPlantState.details ? (props.userPlantState.details[index].data.image_url ? props.userPlantState.details[index].data.image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png')
                                        : 
                                        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
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
                                    <Button className={buttonStyles} style={{background: '#b1dbb8', boxShadow: 'none'}}>Edit Plant</Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            : <p> babies are loadin</p>
            }
            <br/> <br/> <br/> <br/>
            <Typography paragraph>
            Not only do indoor plants enhance the overall appearance of a space, 
            but they've been shown to boost moods, increase creativity, reduce stress, 
            and eliminate air pollutants — making for a healthier, happier you.
            <br/> <br/>
            - <a 
                href='https://www.thesill.com/blogs/care-miscellaneous/why-you-need-plants-in-your-life#:~:text=Not%20only%20do%20indoor%20plants,for%20a%20healthier%2C%20happier%20you.'
                style={{color: 'black'}}
                >
                    The Sill
                </a>
            </Typography>
        </div>
    )
}

export default connect(state, actions)(Profile);