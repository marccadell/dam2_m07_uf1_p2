// App.js
import React, { useState } from 'react';
import WelcomeScreen from '../src/components/WelcomeScreen';
import GameScreen from '../src/components/GameScreen';
import ResultScreen from '../src/components/ResultScreen';
import '../src/styles/styles.css';

function App() {
    const [playerName, setPlayerName] = useState('');
    const [gameState, setGameState] = useState('welcome');
    const [gameResult, setGameResult] = useState(null); // null, 'won', 'lost'

    const startGame = (name) => {
        setPlayerName(name);
        setGameState('game');
    };

    const endGame = (result) => {
        setGameResult(result); // 'won' o 'lost'
        setGameState('result');
    };

    return (
        <div>
            {gameState === 'welcome' && <WelcomeScreen onStartGame={startGame} />}
            {gameState === 'game' && <GameScreen playerName={playerName} onEndGame={endGame} />}
            {gameState === 'result' && <ResultScreen playerName={playerName} result={gameResult} />}
        </div>
    );
}

export default App;