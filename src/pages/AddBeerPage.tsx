import axios from "axios";
import { useState } from "react";

export const AddBeerPage = () => {
  const initialFormValues = {
    name: "",
    tagline: "",
    description: "",
    first_brewed: "",
    brewers_tips: "",
    attenuation_level: "",
    contributed_by: "",
    expireAt: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://f5-beers-065cad3017be.herokuapp.com/beers",
        formValues
      );
      alert("New beer successfully saved to the database!");
      setFormValues(initialFormValues);
    } catch (error) {
      alert("Error saving beer to the database.");
      console.error(error);
    }
  };
  return (
    <div>
      <h2>Add Beer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="tagline">Tagline:</label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            value={formValues.tagline}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="first_brewed">First Brewed:</label>
          <input
            type="text"
            id="first_brewed"
            name="first_brewed"
            value={formValues.first_brewed}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="brewers_tips">Brewer's Tips:</label>
          <input
            type="text"
            id="brewers_tips"
            name="brewers_tips"
            value={formValues.brewers_tips}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="attenuation_level">Attenuation Level:</label>
          <input
            type="number"
            id="attenuation_level"
            name="attenuation_level"
            value={formValues.attenuation_level}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="contributed_by">Contributed By:</label>
          <input
            type="text"
            id="contributed_by"
            name="contributed_by"
            value={formValues.contributed_by}
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor="expireAt">Expire At:</label>
        <input
          type="text"
          id="expireAt"
          name="expireAt"
          value={formValues.expireAt}
          onChange={handleInputChange}
        />
        <button type="submit">Add Beer</button>
      </form>
    </div>
  );
};
