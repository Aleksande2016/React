import React from 'react'
import classes from './Dashboard.module.css'  // * as
import PlayButton from './../../assets/img/play.svg'

const Dashboard = ({points}) => {
    console.log(0.2 * Math.sqrt(points))
    return (
        <section className={classes.dashboardContainer}>
            <div className={classes.gameBlock}>
                <p>The most populat game is <br />
                    <b>Speak IT</b>
                </p>
                <img className={classes.btnPlay} src={PlayButton} alt="" />
                <button className={classes.btnRandom}>Play random game</button>
            </div>
            <div className={classes.pointsBlock}>
                <span>Common experience</span>
                <h3>{points} points</h3>
            </div>
            <div className={classes.levelBlock}>
                <span>level</span>
                <h3>{(0.2 * Math.sqrt(points)).toFixed()} level</h3>
                <p>Learn 750 new words in one course</p>
            </div>
            <div className={classes.levelBackground}></div>
        </section>
    )
}

export default Dashboard