import React from 'react';
import '../assets/styles/Home.css';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="home-container">
        <h1>Soccer fans, welcome to the World Cup 2026 soccer pool!</h1>
        <p>Before starting, please view the <a href="/rules">rules</a>.</p>
        <p>Below are the teams and their respective groups that will be competing in the tournament. Good luck everyone!</p>
        <div className="group-container">
          <div className="group-box">
            <h3 data-group="A">Group A</h3>
            <ul>
              <li>USA</li>
              <li>Belgium</li>
              <li>Japan</li>
              <li>Morocco</li>
            </ul>
          </div>

          <div className="group-box">
            <h3 data-group="B">Group B</h3>
            <ul>
              <li>Canada</li>
              <li>Netherlands</li>
              <li>Nigeria</li>
              <li>South Korea</li>
            </ul>
          </div>

          <div className="group-box">
            <h3 data-group="C">Group C</h3>
            <ul>
              <li>Mexico</li>
              <li>Portugal</li>
              <li>Senegal</li>
              <li>Uruguay</li>
            </ul>
          </div>

          <div className="group-box">
            <h3 data-group="D">Group D</h3>
            <ul>
              <li>Spain</li>
              <li>Germany</li>
              <li>Colombia</li>
              <li>Australia</li>
            </ul>
          </div>

          <div className="group-box">
            <h3 data-group="E">Group E</h3>
            <ul>
              <li>Argentina</li>
              <li>Italy</li>
              <li>Cote d'Ivoire</li>
              <li>Austria</li>
            </ul>
          </div>

          <div className="group-box">
            <h3 data-group="F">Group F</h3>
            <ul>
              <li>France</li>
              <li>Croatia</li>
              <li>Iran</li>
              <li>Cameroon</li>
            </ul>
          </div>

          <div className="group-box">
            <h3 data-group="G">Group G</h3>
            <ul>
              <li>Brazil</li>
              <li>Denmark</li>
              <li>Turkey</li>
              <li>Ecuador</li>
            </ul>
          </div>

          <div className="group-box">
            <h3 data-group="H">Group H</h3>
            <ul>
              <li>England</li>
              <li>Switzerland</li>
              <li>Serbia</li>
              <li>Venezuela</li>
            </ul>
          </div>
        </div>

        <button className="start-button">Start</button>
      </div>
    </div>
  );
};

export default Home;