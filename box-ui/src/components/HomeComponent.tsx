import HeaderComponent from './HeaderComponent';
import HomeButtonsComponent from './HomeButtonsComponent';
import './HomeComponent.css';

const HomeComponent = () => {
  return (
    <div className='Home'>
      <div>
        <HeaderComponent />
      </div>
      <div className='HomeButtonsContainer'>
        <HomeButtonsComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
