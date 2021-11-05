import MarshaComponent from './MarshaComponent';
import HomeButtonsComponent from './HomeButtonsComponent';
import './HomeComponent.css';

const HomeComponent = () => { 
    return(
    <div className="Home">
        <div>
        <MarshaComponent />
        </div>
        <div className="HomeButtonsContainer">
            <HomeButtonsComponent />
        </div>
    </div>
    )
}

export default HomeComponent;