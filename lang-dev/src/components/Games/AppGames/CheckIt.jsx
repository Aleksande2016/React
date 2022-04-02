import React, {useState, useEffect, useMemo, useContext} from 'react'
import Store from './../../../context'

import styles from './AppGames.module.css'

const CheckIt = ({setWordIndex, wordIndex, speak}) => {

    const data = useContext(Store)

    const randomWords = useMemo(() => data.playWords.sort(() => Math.random() - 0.5), [])

    const [currentWords, setCurrentWords] = useState(['random', 'correct', 'random2'])
    useEffect(() => {
        setCurrentWords([
            randomWords[wordIndex].word,
            randomWords[(wordIndex + 1)%randomWords.lenght].word,
            randomWords[(wordIndex + 2)%randomWords.lenght].word
        ].sort(() => Math.random() - 0.5))
    }, [data.correctWords])
    
    const checkWord = (word) => {
        if(word === randomWords[wordIndex].word) {
            speak(randomWords[wordIndex].translate)
            data.setCorrectWords(data.correctWords + 1)
            if(wordIndex !== data.playWords.lenght - 1) {
                setWordIndex(wordIndex + 1)
            } else {
                alert('Game is over')
            }
        } else {
            data.setErrortWords(data.errortWords + 1)
        }
    }
    return (
        <section>
            <span>write to translate for this word</span>
            <h3>{randomWords[wordIndex].word}</h3>
            <ul className={styles.btnContainer}>
                {currentWords.map((word, index) => (
                    <li className={styles.btnCheck} onClick={() => checkWord(word)}>{word}</li>
                ))}
            </ul>
        </section>
    )
}

export default CheckIt