import {Link} from "react-router-dom"

const LandingPage = ()=>{

    return(

        <div>
            <h3>LANDING PAGE</h3>
            <Link to="/home">
                <h4>
                    Home
                </h4>
            </Link>
        </div>
    )
}

export default LandingPage;