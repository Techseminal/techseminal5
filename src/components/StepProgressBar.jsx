import React from 'react'
import "react-step-progress-bar/styles.scss";
import { ProgressBar, Step } from "react-step-progress-bar";
import IdeaStage from '../assets/icons/idea.png'
import Research from '../assets/icons/market-research.png'
import Documentaion from '../assets/icons/essay.png'
import prototype from '../assets/icons/innovative.png'
import Business from '../assets/icons/handshake.png'

function StepProgressBar(props) {
    return (
        <ProgressBar
            percent={props.stage}
            fillBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        src={IdeaStage}
                        className="ProgressImg"
                        alt="Ideation"
                        title="Ideation"
                    />
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        src={Research}
                        className="ProgressImg"
                        alt="Research"
                        title="Research"
                    />
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        src={Documentaion}
                        className="ProgressImg"
                        alt="Documentation"
                        title="Documentation"
                    />
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        src={prototype}
                        className="ProgressImg"
                        alt="Prototype"
                        title="Prototype"
                    />
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished }) => (
                    <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        src={Business}
                        className="ProgressImg"
                        alt="Business"
                        title="Business"
                    />
                )}
            </Step>
        </ProgressBar>
    )
}

export default StepProgressBar
