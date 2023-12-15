
import '../styles/styles.css';

function ResultScreen({ playerName, won }) {

    return (
      <div className='container'>
         {won === 'won' ? 
          <h1 className='won'>Acabas de Ganar {playerName}!</h1>
          : 
          <h1 className='lose'>Has perdido {playerName}!</h1>
          }
      </div>
    );

}

export default ResultScreen;