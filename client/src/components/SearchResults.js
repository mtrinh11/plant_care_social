import {connect} from 'react-redux'

import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const state = ({searchState}) => {
    return {
        searchState
    }
}

const actions = (dispatch) => {
    return {}
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
    console.log(props)

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    return (
        <div>
            {props.searchState.data ? 
                <div style={{display: 'grid', gridTemplateColumns: '50% 50%', justifyItems: 'center'}}>
                    {props.searchState.data.data.map((plant) => (
                        <Card className={classes.root} style={{margin: '10px'}} key={plant.id}>
                            <CardHeader
                                action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                                }
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
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton 
                                    style={{marginLeft: 'auto', backgroundColor: 'transparent'}}
                                    onClick={() => props.history.push(`/search/species/${plant.id}`)}
                                >
                                    More Info
                                </IconButton>
                            </CardActions>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                                </CardContent>
                            </Collapse>

                        </Card>
                    ))}
                </div>
              : <p> Loading</p> 
            }
        </div>
    )
}

export default connect(state, actions)(SearchResults);