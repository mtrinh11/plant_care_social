import Nav from './Nav'

const Homepage = ({children}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%', width: '100%'}}>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: "url('https://images.unsplash.com/photo-1525033842647-a956848705f0')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <Nav />
            </div>
        </div>
    )
}

export default Homepage;