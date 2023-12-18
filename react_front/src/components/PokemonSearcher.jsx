
const PokemonSearcher = ({ value, onChange }) => {
    return (
        <div className="row pt-5 pb-4">
            <div className="col-12">
                <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    placeholder="Filtra pokemons por nombre..."
                    className="form-control filter text-center rounded-0"
                />
            </div>
        </div>
    );
};

export default PokemonSearcher;
