import React, { useState, useEffect } from "react";
import axios from "axios";
import SinglePokemonCard from "./SinglePokemonCard";
import { Link, useParams } from "react-router-dom";


const ShowSinglePokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const id = useParams();
    const API_URI = "http://localhost:8080/pokemons/" + id.id + "/";


    useEffect(() => {
        getPokemon();
    }, []);

    const getPokemon = async () => {

        try {
            const res = await axios.get(API_URI);
            setPokemon(res.data);
        } catch (error) {
            console.error("Error fetching pokemon:", error);
        }
    };


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-5 mt-5">
                        <Link to="/" className="btn btn-danger float-start">Volver</Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row position-relative">
                    <SinglePokemonCard key={pokemon.id} pokemon={pokemon} />
                </div>
            </div>
        </>
    );
};

export default ShowSinglePokemon;
