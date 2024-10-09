import './Components.css';
import React, { useState } from 'react';

export const Link = (props) => {
    return (
        <div className="Container">
            <a
                className="Link-button"
                href={props.href}
                id={props.id}
                target={props.target}
            >{props.text}</a>
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
    const [isHovered, setIsHovered] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleImageClick = () => {
        if (props.clickable !== false) {
            setIsOverlayVisible(true);
        }
    }

    const handleContentClick = (event) => {
        event.stopPropagation();
    }

    return (
        <div>
            <div
                onClick={handleImageClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: isHovered ? `scale(${props.scaleFactor})` : 'scale(1)',
                    transition: 'transform 0.3s ease',
                    margin: '0px 20px 10px 20px'
                }}
                className='Image'>
                <svg width={300 * props.scale} height={400 * props.scale}>
                    <defs>
                        <pattern id={props.id} patternUnits="userSpaceOnUse" width="300" height="400">
                            <image href={props.href} x="0" y="0" width="300" height="400" />
                        </pattern>
                    </defs>
                    <g transform={`scale(${props.scale})`}>
                        <rect x="10" y="10" width="280" height="380" rx="110" ry="110" fill={`url(#${props.id})`} stroke="maroon" strokeWidth="2" />
                        <text x={`${50 / props.scale}%`} y={`${35 / props.scale}%`} fill="white" fontSize="24" textAnchor="middle" alignmentBaseline="middle">
                            <tspan x={`${50 / props.scale}%`} dy="0"> {props.titleLine1} </tspan>
                            <tspan x={`${50 / props.scale}%`} dy="1.6em"> {props.titleLine2} </tspan>
                        </text>
                        <text x={`${50 / props.scale}%`} y={`${50 / props.scale}%`} fill="white" fontSize="16" textAnchor="middle" alignmentBaseline="top">
                            <tspan x={`${50 / props.scale}%`} dy="0"> {props.captionLine1} </tspan>
                            <tspan x={`${50 / props.scale}%`} dy="1.6em"> {props.captionLine2} </tspan>
                            <tspan x={`${50 / props.scale}%`} dy="1.6em"> {props.captionLine3} </tspan>
                        </text>
                    </g>
                </svg>
            </div>
            {isOverlayVisible && (
                <div className="Overlay" onClick={() => setIsOverlayVisible(false)}>
                    <div className="Overlay-content" onClick={handleContentClick}>
                        {/* Customize the overlay content as needed */}
                        <h1>{`${props.titleLine1} ${props.titleLine2}`}</h1>
                        <div className="Overlay-content-container">
                            <img id={`${props.titleLine1} ${props.titleLine2}.full`} src={props.fullImage} height="600px" style={{margin: '10px'}} alt={props.name}/>
                            <div className="Overlay-text" style={{width: "400px"}}>
                                <p>{props.seasons}</p>
                                <p>{props.descriptionParagraph1}</p>
                                <p>{props.descriptionParagraph2}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                                key={i}
                                id={`${elem.name}-${i}`}
                                href={elem.imageURL}
                                scale={1}
                                scaleFactor={1.047}
                                titleLine1={elem.titleLine1}
                                titleLine2={elem.titleLine2}
                            />
                        )
                    })}
                </div>
            </div>
            <div style={{ height: '10vh' }} />
        </div>
    )
}

export const Footer = () => {

    return (
        <footer className="Footer">
            <div className="Quarter-div"><h1>Find us here</h1><p>hello@reallygreatsite.com</p></div>
            <div className="Quarter-div"><p>512 Covington Terrace</p></div>
            <div className="Quarter-div">Casey's Cookies</div>
            <div className="Quarter-div">test</div>
        </footer>
    )
}