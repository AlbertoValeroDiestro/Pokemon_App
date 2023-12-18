import React, { useRef } from "react";
import PokemonCard from "./PokemonCard";
import {useSpring, animated} from "react-spring";

const SinglePokemonCard = ({ pokemon }) => {

    const elementRef = useRef(null);
    const props = useSpring({
        
        from: { height: 'auto'},
        to: async (next, cancel) => {

            await next({ height:elementRef.current.parentElement.offsetHeight })
        },
    });
     

    return (<animated.div
        ref={elementRef}
        id={pokemon.id}
        key={pokemon.id}
       
        className="col-md-12 mb-4 justify-content-center align-items-center d-flex align-items-stretch cursor-pointer"
    >
        <PokemonCard key={pokemon.id} pokemon={pokemon} description={true} />
    </animated.div>);
};
export default SinglePokemonCard;