import './Components.css';
import { useState } from 'react';

export const Link = (props) => {
    return (
        <div className="Container">
            <button className="Link-button" id={props.id}>{props.text}</button>
        </div>
    );
}

export const Divider = () => {
    return (
        <svg width="100%" height="12" >
            <rect x="3%" y='4.5' width="94%" height="3" fill="maroon" />
            <circle cx="3%" cy="50%" r="4" fill="#c46e08" strokeWidth="3" stroke="maroon" />
            <circle cx="97%" cy="50%" r="4" fill="#c46e08" strokeWidth="3" stroke="maroon" />
        </svg>
    )
}

export const Image = (props) => {
    return (
        <div>
            <svg width="300" height="400">
                <defs>
                    <pattern id="imgPattern" patternUnits="userSpaceOnUse" width="300" height="400">
                        <image href={props.href} x="0" y="0" width="300" height="400" />
                    </pattern>
                </defs>
                <rect x="10" y="10" width="280" height="380" rx="110" ry="110" fill="url(#imgPattern)" stroke="white" strokeWidth="2" />

                <text x="50%" y="35%" fill="white" font-size="24" text-anchor="middle" alignment-baseline="middle">
                    {props.title}
                </text>
                <text x="50%" y="50%" fill="white" font-size="16" text-anchor="middle" alignment-baseline="top" >
                    <tspan x="50%" dy="0"> {props.captionLine1} </tspan>
                    <tspan x="50%" dy="1.6em"> {props.captionLine2} </tspan>
                    <tspan x="50%" dy="1.6em"> {props.captionLine3} </tspan>
                </text>
            </svg>
        </div>
    )
}
