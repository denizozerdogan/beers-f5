import { describe, test, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom";
import nock, { RequestBodyMatcher } from "nock";
import axios from "axios";
import {AddBeerPage} from "../pages/AddBeerPage";

const API_URL = "https://f5-beers-065cad3017be.herokuapp.com";

axios.defaults.adapter = "http";

describe("Iteration 7", () => {
  describe("AddBeerPage component", () => {
    const newBeer = {
      name: "New Beer 1",
      tagline: "New Tagline 1",
      description: "New Description 1",
      first_brewed: "01/2023",
      brewers_tips: "Test Brewer Tips",
      attenuation_level: 1,
      contributed_by: "New Contributor 1",
    };


    beforeEach(() => {
      render(
        <MemoryRouter>
          <AddBeerPage />
        </MemoryRouter>
      );
    });

    test("renders the 'name' input field", async () => {
      const nameInput = screen.getByLabelText(/name:/i);
      await waitFor(() => {
        expect(nameInput).toBeInTheDocument();
      });
    });
    
    test("renders the 'tagline' input field", async () => {
      const taglineInput = screen.getByLabelText(/tagline:/i);
      await waitFor(() => {
        expect(taglineInput).toBeInTheDocument();
      });
    });
    
    test("renders the 'description' input field", async () => {
      const descriptionInput = screen.getByLabelText(/description:/i);
      await waitFor(() => {
        expect(descriptionInput).toBeInTheDocument();
      });
    });
    
    test("renders the 'first_brewed' input field", async () => {
      const firstBrewedInput = screen.getByLabelText(/first brewed:/i);
      await waitFor(() => {
        expect(firstBrewedInput).toBeInTheDocument();
      });
    });
    
    test("renders the 'brewers_tips' input field", async () => {
      const brewersTipsInput = screen.getByLabelText(/brewer's tips:/i);
      await waitFor(() => {
        expect(brewersTipsInput).toBeInTheDocument();
      });
    });
    
    test("renders the 'contributed_by' input field", async () => {
      const contributedByInput = screen.getByLabelText(/contributed by:/i);
      await waitFor(() => {
        expect(contributedByInput).toBeInTheDocument();
      });
    });
    
    test("renders the 'attenuation_level' input field", async () => {
      const attenuationInput = screen.getByLabelText(/attenuation level:/i);
      await waitFor(() => {
        expect(attenuationInput).toBeInTheDocument();
      });
    });
    test("sends form values to the API via POST request when the form is submitted", async () => {
      const requestBody: RequestBodyMatcher = {
        name: "",
        tagline: "",
        description: "",
        first_brewed: "",
        brewers_tips: "",
        attenuation_level: "",
        contributed_by: "",
      };
    
      const scope = nock(API_URL)
        .post("/beers", (body: RequestBodyMatcher) => {
          Object.assign(requestBody, body);
          return true;
        })
        .reply(200, {});
    
        const nameInput = screen.getByLabelText("Name:") as HTMLInputElement;
        const taglineInput = screen.getByLabelText("Tagline:") as HTMLInputElement;
        const descriptionInput = screen.getByLabelText("Description:") as HTMLTextAreaElement;
        const firstBrewedInput = screen.getByLabelText("First Brewed:") as HTMLInputElement;
        const brewersTipsInput = screen.getByLabelText("Brewer's Tips:") as HTMLInputElement;
        const contributedByInput = screen.getByLabelText("Contributed By:") as HTMLInputElement;
        const attenuationInput = screen.getByLabelText("Attenuation Level:") as HTMLInputElement;

      await userEvent.type(nameInput, newBeer.name);
      await userEvent.type(taglineInput,newBeer.tagline);
      await userEvent.type(descriptionInput,newBeer.description);
      await userEvent.type(firstBrewedInput,newBeer.first_brewed);
      await userEvent.type(brewersTipsInput,newBeer.brewers_tips);
      await userEvent.type(contributedByInput,newBeer.contributed_by);
      await userEvent.type(attenuationInput,newBeer.attenuation_level.toString());

      await userEvent.click(screen.getByRole("button", { name: /add beer/i }));

      scope.done();

      expect(requestBody.name).toBe(newBeer.name);
      expect(requestBody.tagline).toBe(newBeer.tagline);
      expect(requestBody.description).toBe(newBeer.description);
      expect(requestBody.first_brewed).toBe(newBeer.first_brewed);
      expect(requestBody.brewers_tips).toBe(newBeer.brewers_tips);
      expect(requestBody.attenuation_level).toBe(
        String(newBeer.attenuation_level)
      );
      expect(requestBody.brewers_tips).toBe(newBeer.brewers_tips);
    });
  });
});