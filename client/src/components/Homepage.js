import Nav from './Nav'

const Homepage = ({children}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
            <Nav />
            <div>
                <div> welcome welcome welcome</div>
            </div>
        </div>
    )
}

export default Homepage;