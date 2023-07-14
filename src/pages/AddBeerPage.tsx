import axios from "axios";
import { useState } from "react";

export const AddBeerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    first_brewed: '',
    brewers_tips: '',
    attenuation_level: '',
    contributed_by: '',
  });

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBeer(formData);
  };

  const addBeer = (beerData: any) => {
    axios
      .post('https://f5-beers-065cad3017be.herokuapp.com/new', beerData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Add Beer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="tagline">Tagline</label>
          <input type="text" id="tagline" name="tagline" value={formData.tagline} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="first_brewed">First Brewed</label>
          <input type="text" id="first_brewed" name="first_brewed" value={formData.first_brewed} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="brewers_tips">Brewer's Tips</label>
          <input type="text" id="brewers_tips" name="brewers_tips" value={formData.brewers_tips} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="attenuation_level">Attenuation Level</label>
          <input type="number" id="attenuation_level" name="attenuation_level" value={formData.attenuation_level} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="contributed_by">Contributed By</label>
          <input type="text" id="contributed_by" name="contributed_by" value={formData.contributed_by} onChange={handleChange} />
        </div>
        <button type="submit">Add Beer</button>
      </form>
    </div>
  );
};
