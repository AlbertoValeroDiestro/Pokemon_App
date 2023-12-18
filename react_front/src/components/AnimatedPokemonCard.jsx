import React, { useState, useRef } from "react";
import PokemonCard from "./PokemonCard";
import { useSpring, animated } from 'react-spring';

const AnimatedPokemonCard = ({ pokemon }) => {
    const [isToggled, setToggle] = useState(false);
    const elementRef = useRef(null);
    const props = useSpring({
        
        from: { },
        to: async (next, cancel) => {
            
            await next({ zIndex: isToggled ? 111 : 1})
            await next({ position: isToggled ? 'absolute' : 'relative', })
            await next({ width: isToggled ? '100%' : '33%', })
            await next({ height: isToggled ?  elementRef.current.parentElement.offsetHeight : 'auto', })
        },
    });
     
    return (<animated.div
        ref={elementRef}
        id={pokemon.id}
        key={pokemon.id}
        style={props}
        onClick={() => setToggle(!isToggled)}
        className="col-md-4 mb-4 justify-content-center align-items-center d-flex align-items-stretch cursor-pointer"
    >
        <PokemonCard key={pokemon.id} pokemon={pokemon} description={false} />
    </animated.div>);
};
export default AnimatedPokemonCard;