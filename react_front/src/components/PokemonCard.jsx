import { Link } from "react-router-dom";
import WriteFX from "./WriteFX";
 
const PokemonCard = ({ pokemon, description }) => {
    const text = "textop";
    return (<div className="card" key={pokemon.id}>
        <div className="card-header position-relative px-0 pb-0 mb-0 d-flex align-items-center">
            <img
                className="card-img-top mx-auto"
                src={pokemon.img}
                alt={pokemon.name}
            />
            <p className="id-card-text position-absolute bottom-0 left-0 mb-0 px-3 pt-1 pb-1 fw-bold">
                ID / {pokemon.id}
            </p>
        </div>

        <div className="card-body">
            <div className="row">
                <h4 className="card-title text-start text-capitalize mb-0">
                    {pokemon.name}
                </h4>
            </div>
            <div className="row">
                <p className="text-start">
                    {pokemon.Types && pokemon.Types.map((types) => (
                        <span key={types.id} className="badge pokemon me-1 d-inline-block text-uppercase fw-light">
                            {types.name}
                        </span>
                    ))}

                </p>
            </div>
            {pokemon.evolvesFrom !== "n/a" ? (
                <div className="row">
                    <div className=" position-relative">
                        <div className="evolution-text text-start">
                            <p className="fw-light mb-0 ms-2">Evoluciona de:</p>
                            <h4 className="fw-light ms-2">{pokemon.evolvesFrom}</h4>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            {description ? (<div className="row">
                <p className="text-start">

                    <WriteFX  text="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. " delay={100} infinte={false}  />

                </p>

            </div>) : (<div></div>)}
            {description ? (<div>
            </div>) : (<div className="row">
                <Link to={`/${pokemon.id}/`} className="small text-start">Ver más</Link>
            </div>)}

        </div>
    </div>);
};
export default PokemonCard;