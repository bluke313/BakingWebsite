import './Components.css';
import { useState } from 'react';
import sample from './images/sample.png'
import sample2 from './images/sample2.jpg'

export const Link = (props) => {
    return (
        <div className="Container">
            <a className="Link-button" href={props.href} id={props.id}>{props.text}</a>
        </div>
    );
}

export const Divider = (props) => {
    return (
        <svg id={props.id} width="100%" height="12" >

            <rect x="3%" y='4.5' width="94%" height="3" fill="maroon" />
            <circle cx="3%" cy="50%" r="4" fill="#c46e08" strokeWidth="3" stroke="maroon" />
            <circle cx="97%" cy="50%" r="4" fill="#c46e08" strokeWidth="3" stroke="maroon" />

        </svg>
    )
}

export const TextDivider = (props) => {
    return (
        <svg width="50" height="35" >
            <rect x="50%" width="1" height="35" fill="black" />
        </svg>
    )
}

export const Image = (props) => {
    return (
        <div style={props.style}>
            <svg width={300 * props.scale} height={400 * props.scale}>
                <defs>
                    <pattern id={props.id} patternUnits="userSpaceOnUse" width="300" height="400">
                        <image href={props.href} x="0" y="0" width="300" height="400" />
                    </pattern>
                </defs>
                <g transform={`scale(${props.scale})`}>
                    <rect x="10" y="10" width="280" height="380" rx="110" ry="110" fill={`url(#${props.id})`} stroke="white" strokeWidth="2" />
                    <text x={`${50 / props.scale}%`} y={`${35 / props.scale}%`} fill="white" fontSize="24" textAnchor="middle" alignmentBaseline="middle">
                        {props.title}
                    </text>
                    <text x={`${50 / props.scale}%`} y={`${50 / props.scale}%`} fill="white" fontSize="16" textAnchor="middle" alignmentBaseline="top">
                        <tspan x={`${50 / props.scale}%`} dy="0"> {props.captionLine1} </tspan>
                        <tspan x={`${50 / props.scale}%`} dy="1.6em"> {props.captionLine2} </tspan>
                        <tspan x={`${50 / props.scale}%`} dy="1.6em"> {props.captionLine3} </tspan>
                    </text>
                </g>
            </svg>
        </div>
    )
}

export const Season = (props) => {

    return (
        <div className="Season-padding">
            <div className="Season" id={props.id}>
                <h1 style={{ color: 'white' }}>{props.text}</h1>
                <div className="Season-container">
                    {props.items.map((elem, i) => {
                        return (
                            <Image
                                id={`${elem.name}-${i}`}
                                href={elem.imageURL}
                                scale={1}
                                style={{ padding: '0px 20px 10px 20px' }}
                            />
                        )
                    })}
                </div>
            </div>
            <div style={{ height: '10vh' }} />
        </div>
    )
}
