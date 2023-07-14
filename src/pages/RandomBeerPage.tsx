import axios from "axios";
import { useState, useEffect } from "react";
import { BeerDetails } from "./BeersDetailPage";

export const RandomBeerPage = () => {
  const [beer, setBeer] = useState<BeerDetails | null>(null);

  useEffect(() => {
    const fetchRandomBeer = async () => {
      try {
        const response = await axios.get('https://f5-beers-065cad3017be.herokuapp.com/beers/random');
        setBeer(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRandomBeer();
  }, []);

  if (!beer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{beer.name}</h1>
      <img src={beer.image_url} alt={beer.name} />
      <p>Tagline: {beer.tagline}</p>
      <p>First Brewed: {beer.first_brewed}</p>
      <p>Attenuation Level: {beer.attenuation_level}</p>
      <p>Description: {beer.description}</p>
      <p>Contributed by: {beer.contributed_by}</p>
    </div>
  );
};