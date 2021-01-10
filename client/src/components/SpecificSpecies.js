import React, {useState} from 'react'
import {connect} from 'react-redux'

import {GetSpecificSpeciesFromApi} from '../services/TreffleServices'
import {AddPlantChild} from '../services/UserPlantServices'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {ClearUserPlants} from '../store/actions/UserPlantActions'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const state = ({userState}) => {
    return {userState}
}

const actions = (dispatch) => {
    return {
        clearUserPlants: () => dispatch(ClearUserPlants())
    }
}

const SpecificSpecies = (props) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [speciesData, setSpeciesData] = useState('')
    
    const fetch = async() => {
        try {
            let res = await GetSpecificSpeciesFromApi(props.match.params.id)
            setSpeciesData(res.data.data)
            setLoading(false)
        } catch (error) {
            throw error
        }
    }

    const addToUserPlants = async(n, p, bday, tId) => {
        let formData = {
            name: n,
            parent: p,
            birthday: bday,
            TreffleId: tId
        }
        await AddPlantChild(formData)
        await props.clearUserPlants()
        props.history.push('/profile')
    }

    console.log(props)
    console.log(speciesData)

    if (loading) {
        fetch()
    }

    const createData = (category, details) => {
        return { category, details };
    }

    const checkNullorFalse = (input) => {
        switch (input) {
            case false:
                return 'No'
            case true:
                return 'Yes'
            case null:
                return 'No info'
            case '':
                return 'No info'
            default:
                return input
        }
    }

    const parseList = (input) => {
        if (typeof(input) != 'object') {
            return input
        }
        return input.map((item, index) => input.length-1 === index ? `${item}` : `${item}, `)
    }

    let rowsOne = [
        createData('',<h1 style={{textAlign: 'left'}}>BASIC INFORMATION</h1>),
        createData('Common Name', checkNullorFalse(speciesData.common_name)),
        createData('Scientific Name', checkNullorFalse(speciesData.scientific_name)),
        createData('Genus', checkNullorFalse(speciesData.genus)),
        createData('Other Names', (speciesData.common_names ? parseList(checkNullorFalse(speciesData.common_names.en)) : 'No info')),
        createData('Family', checkNullorFalse(speciesData.family)),
        createData('Family Common Name', checkNullorFalse(speciesData.family_common_name)),
        createData('Ligneous Type', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.ligneous_type) : 'No Info')),
        createData('Vegetable?', checkNullorFalse(speciesData.vegetable)),
        createData('Duration', <p>{checkNullorFalse(speciesData.duration)} <br/> <br/><div style={{textAlign:'left'}}>- Annual: plants that live, reproduce, and die in one growing season.
        <br/> - Biennial: plants that need two growing seasons to complete their life cycle, normally completing vegetative growth the first year and flowering the second year.
        <br/> - Perennial: plants that live for more than two years, with the shoot system dying back to soil level each year.</div></p>),
        createData('Edible?', checkNullorFalse(speciesData.edible)),
        createData('Days to Harvest', (speciesData.growth? checkNullorFalse(speciesData.growth.days_to_harvest) : 'No Info')),
        createData('Edible Parts', checkNullorFalse(speciesData.edible_part)),
        createData('Flower Color', (speciesData.flower? checkNullorFalse(speciesData.flower.color) : 'No Info')),
        createData('Foliage Color', (speciesData.foliage ? checkNullorFalse(speciesData.foliage.color) : 'No Info')),
        createData('Leaf Retention', (speciesData.foliage ? checkNullorFalse(speciesData.foliage.leaf_retention) : 'No Info')),
        createData('Foliage Texture', (speciesData.foliage ? checkNullorFalse(speciesData.foliage.texture) : 'No Info')),
        createData('Fruit or Seed Color', (speciesData.fruit_or_seed ? checkNullorFalse(speciesData.fruit_or_seed.color): 'No Info')),
    ];

    let rowsTwo = [
        createData('',<h1 style={{textAlign: 'left'}}>CARE INFORMATION</h1>),
        createData('Description', (speciesData.growth? checkNullorFalse(speciesData.growth.discription) : 'No Info')),
        createData('Sowing Description', (speciesData.growth? checkNullorFalse(speciesData.growth.sowing) : 'No Info')),
        createData('Average Height (in cm)', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.average_height.cm) : 'No Info')),
        createData('Maximum Height (in cm)', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.macimum_height) : 'No Info')),
        createData('Bloom Months', (speciesData.growth? checkNullorFalse(speciesData.growth.bloom_months) : 'No Info')),
        createData('Growth Months', (speciesData.growth? checkNullorFalse(speciesData.growth.growth_months) : 'No Info')),
        createData('Growth Form', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.growth_form) : 'No Info')),
        createData('Growth Habit', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.growth_habit) : 'No Info')),
        createData('Growth Rate', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.grwoth_rate) : 'No Info')),
        createData('Required Amount of Light', (speciesData.growth? <p>{checkNullorFalse(speciesData.growth.light)} <br/> On a scale from 0 (no light) to 10 (very intensive insolation)</p> : 'No Info')),
        createData('Atmospheric Humidity', (speciesData.growth? checkNullorFalse(speciesData.growth.atmospheric_humidity) : 'No Info')),
        createData('Minimum Precipitation (per Year in mm)', (speciesData.growth? checkNullorFalse(speciesData.growth.minimum_precipitation.mm) : 'No Info')),
        createData('Maximum Precipitation (per Year in mm)', (speciesData.growth? checkNullorFalse(speciesData.growth.maximum_precipitation.mm) : 'No Info')),
        createData('Minimum Temperature (in F)', (speciesData.growth? checkNullorFalse(speciesData.growth.minimum_temperature.deg_f) : 'No Info')),
        createData('Maximum Temperature (in F)', (speciesData.growth? checkNullorFalse(speciesData.growth.maximum_temperature.deg_f) : 'No Info')),
        createData('Minimum Root Depth (in cm)', (speciesData.growth? checkNullorFalse(speciesData.growth.minimum_root_depth.cm) : 'No Info')),
        createData('Maximum Acceptable Soil pH', (speciesData.growth? checkNullorFalse(speciesData.growth.ph_maximum) : 'No Info')),
        createData('Minimum Acceptable Soil pH', (speciesData.growth? checkNullorFalse(speciesData.growth.ph_minimum) : 'No Info')),
        createData('Soil Humidity', (speciesData.growth? <p>{checkNullorFalse(speciesData.growth.soil_humidity)} <br/> On a scale from 0 (xerophile) to 10 (subaquatic).</p> : 'No Info')),
        createData('Soil Nutriments', (speciesData.growth? <p>{checkNullorFalse(speciesData.growth.soil_nutriments)} <br/> On a scale from 0 (oligotrophic) to 10 (hypereutrophic).</p> : 'No Info')),
        createData('Soil Salinity', (speciesData.growth? <p>{checkNullorFalse(speciesData.growth.soil_salinity)} <br/> On a scale from 0 (untolerant) to 10 (hyperhaline)</p> : 'No Info')),
        createData('Soil Texture', (speciesData.growth? <p>{checkNullorFalse(speciesData.growth.soil_texture)}<br/> On a scale from 0 (clay) to 10 (rock)</p> : 'No Info')),
        createData('Nitrogen Fixation', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.nitrogen_fixation) : 'No Info')),
        createData('Shape and Orientation', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.shape_and_orientation) : 'No Info')),
        createData('Toxicity', (speciesData.specifications ? checkNullorFalse(speciesData.specifications.toxicity) : 'No Info')),
    ]

    console.log(props)

    return ( 
        loading ? (
            <div> 
                <p> Loading...</p>
            </div>
        ) : (
            <div style={{textAlign: 'center'}}>
                <img 
                    src={speciesData.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'} 
                    alt='plant'
                    style={{maxHeight: '650px'}}
                />
                <br/><br/> <br/>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            {rowsOne.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="left" style={{width: '300px'}}>{row.category}</TableCell>
                                    <TableCell align="center">{row.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                                <br/>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableBody>
                            {rowsTwo.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell align="left" style={{width: '300px'}}>{row.category}</TableCell>
                                    <TableCell align="center">{row.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    )
}

export default connect(state, actions)(SpecificSpecies);