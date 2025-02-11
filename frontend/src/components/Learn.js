import React from "react";

import Drivers from "./Drivers";
import Teams from "./Teams";

const Learn = () => {
  return (
    <div>
      <h1>Learn About Formula 1</h1>
      <p>
        Welcome to the world of Formula 1 racing! Here you can learn about the
        history, rules, teams, and drivers of this exciting sport.
      </p>
      <section>
        <h2>History</h2>
        <p>
          Formula 1, also known as F1, is the highest class of single-seater
          auto racing sanctioned by the Fédération Internationale de
          l'Automobile (FIA). The first World Championship race was held at
          Silverstone in the United Kingdom in 1950.
        </p>
      </section>
      <section>
        <h2>Rules</h2>
        <p>
          F1 cars are the fastest regulated road-course racing cars in the
          world, owing to very high cornering speeds achieved through the
          generation of large amounts of aerodynamic downforce. The rules and
          regulations are constantly evolving to improve safety and competition.
        </p>
      </section>
      <section>
        <h2>Teams</h2>
        <p>
          There are currently 10 teams competing in the F1 World Championship,
          each with two drivers. Some of the most famous teams include Ferrari,
          Mercedes, Red Bull Racing, and McLaren.
        </p>
      </section>
      <section>
        <h2>Drivers</h2>
        <p>
          F1 drivers are among the best in the world, with exceptional skill and
          bravery. Some of the most famous drivers include Lewis Hamilton,
          Michael Schumacher, Ayrton Senna, and Sebastian Vettel.
        </p>
      </section>
      <Drivers />
      <Teams />
    </div>
  );
};

export default Learn;
