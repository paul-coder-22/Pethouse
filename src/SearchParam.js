import React, { useEffect, useState } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Result";


function SearchParam() {

    const [location, setName] = useState("Seattle,WA");
    const [breeds, setBreeds] = useState([]);
    const [animal, AnimalDropDown] = useDropdown("Animal", "dog", ANIMALS);
    const [breed, BreedDropDown, setBreed] = useDropdown("Breed", "", breeds);
    const [pets, setPets] = useState([]);

    async function requestPets() {
        const { animals } = await pet.animals({
            location,
            breed,
            type: animal
        });
        setPets(animals || []);
    }

    /**
     *  useeffect  update every time the browser get update
     * we can prevent this, by specifying when to update the useEffect in the array @Update
     * Schedule the effect 
     */
    useEffect(() => {
        setBreeds([]);
        setBreed("");


        pet.breeds(animal).then(({ breeds: apiBreeds }) => {
            const breedStrings = apiBreeds.map(({ name }) => name);
            setBreeds(breedStrings);
        }, console.error);
    }, [animal, setBreed, setBreeds])


    return (
        <div className="search-params">
            <h1>{location}</h1>
            <form onSubmit={e => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    <input id="location" value={location} placeholder="Location"
                        onChange={e => setName(e.target.value)} />
                </label>

                <button>Submit</button>
                <AnimalDropDown />
                <BreedDropDown />
            </form>
            <Results pets={pets} />
        </div >
    )
}

export default SearchParam;