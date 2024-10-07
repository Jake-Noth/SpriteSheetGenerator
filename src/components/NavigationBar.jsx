
export default function NavigationBar({ pageSetter }){

    const handleNavigation = (destination) => {
        pageSetter(destination)
        console.log('change to' + destination)
    }

    return(
        <nav id='navigation-bar-container'>
            <button onClick={() => handleNavigation('home')} className="navbar-option">Home</button>
            <button onClick={() => handleNavigation('community')} className="navbar-option">Community</button>
            <button onClick={() => handleNavigation('generator')} className="navbar-option">Generator</button>
        </nav>
    )
}