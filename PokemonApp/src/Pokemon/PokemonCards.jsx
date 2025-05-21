export const PokemonCards = ({ pokemonData }) => {
    return (
        <li key={pokemonData.id} className="pokemon-card">
            <figure>
                <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} className="pokemon-image" />
            </figure>
            <h1 className="poke-name">{pokemonData.name}</h1>
            <h1 className="poke-types">{pokemonData.types.map((curType) => curType.type.name).join(", ")}</h1>
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span className="info-head">Height: </span>
                    <span>{pokemonData.height}</span>
                </p>
                <p className="pokemon-info">
                    <span className="info-head">Weight: </span>
                    <span>{pokemonData.weight}</span>
                </p>
                <p className="pokemon-info">
                    <span className="info-head">Speed: </span>
                    <span>{pokemonData.stats[5].base_stat}</span>
                </p>
            </div>
            <div className="grid-three-cols1">
                <p className="pokemon-info1">
                    <span>{pokemonData.base_experience}</span>
                    <span className="info-head">Experience:</span>
                </p>
                <p className="pokemon-info1">
                    <span>{pokemonData.weight}</span>
                    <span className="info-head">Attack:</span>
                </p>
                <p className="pokemon-info1">
                    <span>{pokemonData.abilities[0].ability.name}</span>
                    <span className="info-head">Abilities:</span>
                </p>
            </div>
        </li>
    );
}