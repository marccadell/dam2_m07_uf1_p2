
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';


function GameScreen({ playerName, onEndGame }) {
    const [word, setWord] = useState('');
    const [guesses, setGuesses] = useState([]);
    const maxAttempts = 10;
    const [attempts, setAttempts] = useState(maxAttempts);
    const alphabet = "abcdefghijklmnñopqrstuvwxyz".split('');

    useEffect(() => {
        axios.get('https://random-word-api.herokuapp.com/word?lang=en&length=5')
            .then(response => {
                setWord(response.data[0]);
            })
            .catch(error => {
                console.error("Error al obtener la palabra", error);
            });
    }, []);

    useEffect(() => {
        if (word && word.split('').every(letter => guesses.includes(letter))) {
            onEndGame('won');
        } else if (attempts <= 0) {
            onEndGame('lost');
        }
    }, [guesses, attempts, word, onEndGame]);

    const handleLetterGuess = (letter) => {
        if (!guesses.includes(letter)) {
            setGuesses([...guesses, letter]);
            if (!word.includes(letter)) {
                setAttempts(attempts - 1);
            }
        }
    };

    const renderedWord = word.split('').map(letter => guesses.includes(letter) ? letter : '_').join(' ');

    return (
        <div className='container'>
            <h2>Jugador: {playerName}</h2>
            <p className='maxIntentos'>Intentos restantes: {attempts}</p>
            <p>{renderedWord}</p>
            <div className='container-buttonLetter'>
                {alphabet.map((letter, index) => (
                    <button
                        className='buttonLetter' 
                        key={index}
                        onClick={() => handleLetterGuess(letter)}
                        disabled={guesses.includes(letter)}
                    >
                        {letter.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default GameScreen;