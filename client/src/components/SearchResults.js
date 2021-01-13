import {connect} from 'react-redux'

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {AddPlantChild} from '../services/UserPlantServices'
import {ClearUserPlants, ClearUserPlantsDetails} from '../store/actions/UserPlantActions'


const state = ({searchState, userState}) => {
    return {
        searchState,
        userState
    }
}

const actions = (dispatch) => {
    return {
        clearUserPlants: () => dispatch(ClearUserPlants()),
        clearUserPlantsDetails: () => dispatch(ClearUserPlantsDetails())
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '95%',
        minWidth: '90%',
        maxHeight: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const nullInfoCheck = (input, name) => {
    if (input) {
        return input
    }
    return `Oops! No ${name} available`
}



const SearchResults = (props) => {
    const classes = useStyles();

    const addToUserPlants = async(n, p, bday, tId) => {
        let formData = {
            name: n,
            parent: p,
            birthday: bday,
            TreffleId: tId
        }
        await AddPlantChild(formData)
        await props.clearUserPlants()
        await props.clearUserPlantsDetails()
        props.history.push('/profile')
    }

    return (
        <div>
            {props.searchState.data ? 
                <div style={{display: 'grid', gridTemplateColumns: '50% 50%', justifyItems: 'center'}}>
                    {props.searchState.data.data.map((plant) => (
                        <Card className={classes.root} style={{margin: '10px'}} key={plant.id}>
                            <CardHeader
                                title={nullInfoCheck(plant.common_name, 'Common Name')}
                                subheader={`${nullInfoCheck(plant.scientific_name, 'Scientific Name')}`}
                            >
                            </CardHeader>

                            <CardMedia
                                className={classes.media}
                                image={plant.image_url ? plant.image_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"}
                            >
                            </CardMedia>

                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {`Family: ${plant.family}`} <br/> {`Genus: ${plant.genus}`}
                                </Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                                <IconButton 
                                    aria-label="add to children"
                                    onClick={() => addToUserPlants(
                                        plant.scientific_name, 
                                        props.userState.userId,
                                        new Date(),
                                        plant.id
                                    )}
                                >
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                                <IconButton 
                                    style={{marginLeft: 'auto', backgroundColor: 'transparent'}}
                                    onClick={() => props.history.push(`/search/species/${plant.id}`)}
                                >
                                    More Info
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
                    {props.searchState.data.data.length === 0 ? <p> Sorry, Looks like we have no data on that.</p>: null}
                </div>
              : <p> Loading</p> 
            }
        </div>
    )
}

export default connect(state, actions)(SearchResults);