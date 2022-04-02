import React, {useRef, useState, useContext} from 'react'
import Store from './../../../context'

import styles from './AppGames.module.css'

const WriteIt = ({setWordIndex, wordIndex, playWords, errortWords, setErrortWords, correctWords, setCorrectWords, speak}) => {
    const input = useRef()
    const data = useContext(Store)

    const [randomWords, setRandomWords] = useState(data.playWords.sort(() => Math.random() - 0.5))    
    const checkWord = (event) => {
        event.preventDefault()
        if(input.current.value === randomWords[wordIndex].translate) {
            speak(randomWords[wordIndex].translate)
            data.setCorrectWords(data.correctWords + 1)
            if(wordIndex !== data.playWords.lenght - 1) {
               setWordIndex(wordIndex + 1)
            } else {
                alert('Game is over')
            }
            input.current.value = ''
        } else {
            data.setErrortWords(data.errortWords + 1)
        }
    }
    return (
        <section>
            <span>write to translate for this word</span>
            <h3>{randomWords[wordIndex].word}</h3>
            <form onSibmit={checkWord} className={styles.writeWordBlock}>
                <input ref={input} type="text">

                    <button className={styles.btnOk}>Ok</button>
                </input>
            </form>
        </section>
    )
}

export default WriteIt