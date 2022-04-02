import {useState, useEffect} from 'react';
import {useCookie} from 'react-cookie'
import './App.css';
import styles from './App.module.css'
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import Library from './components/Library/Library';
import Learn from './components/Learn/Learn';
import Games from './components/Games/Games';
//import WriteIt from './components/Games/AppGames/WriteIt';
//import CheckIt from './components/Games/AppGames/CheckIt';
import Store from './context';
import games from './components/Games/index'
// То что нужно прописать в терминале 6 урок 6мин 30сек - npm install react-cookie
function App() {
  const [library, setLibrary] = useState(JSON.parse(localStorage.getItem('library')) || [])
  const [wordIndex, setWordIndex] = useState(0)
  const [correctWords, setCorrectWords] = useState(0)
  const [errortWords, setErrorWords] = useState(0)
  const [playWords, setPlayWords] = useState(library.slice(-10))
  const [cookie, setCookie] = useCookie(['points'])
  const [points, setPoints] = useState(+cookie.points || 0)

  console.log(cookie)
  useEffect(() => {
    if(correctWords) {
      setPoints(points + 1)
      setCookie('points', points + 1)
    }    
  }, [correctWords])

  console.log(library)
  const progressBarWidth = {
    width: `${(100 / library.slice(-10).length) * (wordIndex + 1)}vw`
  }

  const speak = (word) => {
    const speakInstance = new SpeechSynthesisUtterance(word)
    speakInstance.voice = speechSynthesis.getVoices()[51]
    speechSynthesis.speak(speakInstance)
  }
  //console.log(speechSynthesis.getVoices()) - выбираем 51
  // 100 / library.slice(-10).length) * wordIndex
  return (
    <BrowserRouter>
    <Store.Provider value={{correctWords, setCorrectWords, errortWords, setErrorWords, playWords}}>
      <Header />

      <Switch>
        <Route path='/dashboard'>
          <Dashboard points={points} />
        </Route>
        <Route path='/library'>
          <Library library={library} setLibrary={setLibrary} />
        </Route>
        <Route path='/games'>
          <Games />
        </Route>

        <Route path='/game'>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          <nav className={styles.gameNav}>
            <NavLink className={styles.btnBack} to={'/games'}>

            </NavLink>
              <ul className={styles.results}>
                <li>Errors: {errortWords}</li>
                <li>Correct: {correctWords}</li>
                <li>Points: {points}</li>
              </ul>
          </nav>

          <section className={styles.gameContainer}>
            {games.map((game, index) => <Route path={`/game/${game.path}`}>
              <game.component wordIndex={wordIndex} setWordIndex={setWordIndex} speak={speak} />
            </Route>)}
          </section>
        </Route>
        <Route path='/learn'>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar} style={progressBarWidth}></div>
          </div>
          <Learn speak={speak} library={library} wordIndex={wordIndex} setWordIndex={setWordIndex} />

          <div onClick={() => {
            if(wordIndex === library.length - 1) {
              setWordIndex(0)
            } else {
              setWordIndex(wordIndex + 1)
            }
          }} className={styles.btnNext}></div>
        </Route>
      </Switch>
      </Store.Provider>
    </BrowserRouter>
  );
}

export default App;
