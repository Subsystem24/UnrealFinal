import Nav from "../Nav/Nav";
import './Home.css';
import Landing from './Landing';
import Model from "../Model/Model";

function Home() {
  return (
      <>
        <Nav />
        <div className="landing-model-container">
          <div className="landing-home-container">
            <Landing />
          </div>
          <div className="model-container">
            <Model />
          </div>
        </div>
    </>
  );
}


export default Home
