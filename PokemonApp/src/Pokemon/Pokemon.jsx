import { useEffect, useState } from "react";
import './Pokemon.css';
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {

    const [Pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const cardsPerPage = 5;

    const api = 'https://pokeapi.co/api/v2/pokemon?limit=100';

    const fetchPokemon = async () => {
        try {
            const res = await fetch(api);
            const data = await res.json();
            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data = await res.json();
                return data;
            });
            const detailedResponses = await Promise.all(detailedPokemonData);
            setPokemon(detailedResponses);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    const filteredPokemon = Pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination logic
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const currentCards = filteredPokemon.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredPokemon.length / cardsPerPage);

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h1>Error: {error.message}</h1>
            </div>
        );
    }

    return (
        <>
            <section className="container">
                <header>
                    <h1>Let's Catch Pokemon</h1>
                </header>
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(0); // Reset to first page on search
                    }}
                />
                <ul className="card-demo">
                    {currentCards.length === 0 && (<h1 className="no-poke-found">No Pokemon Found</h1>)}
                    {currentCards.map((pokemon) => (
                        <PokemonCards key={pokemon.id} pokemonData={pokemon} />
                    ))}
                </ul>
                <div className="pagination-buttons">
                    <button onClick={handlePrev} disabled={currentPage === 0}>Prev</button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <button onClick={handleNext} disabled={currentPage >= totalPages - 1}>Next</button>
                </div>
            </section>
        </>
    );
};
