import './Components.css';
import React, { useState } from 'react';

export const seasonsToString = (fall, winter, spring, summer) => {

    // eslint-disable-next-line
    if (fall == 1 && winter == 1 && spring == 1 && summer == 1) {
        return "Seasons: any!"
    }

    // eslint-disable-next-line
    if (fall == 0 && winter == 0 && spring == 0 && summer == 0) {
        return ""
    }

    let output = "Seasons: ";

    // eslint-disable-next-line
    if (fall == 1) output = output + "fall, ";
    // eslint-disable-next-line
    if (winter == 1) output = output + "winter, ";
    // eslint-disable-next-line
    if (spring == 1) output = output + "spring, ";
    // eslint-disable-next-line
    if (summer == 1) output = output + "summer, ";

    return output.slice(0, -2);
};

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
};

export const Divider = (props) => {
    return (
        <svg id={props.id} width="100%" height="12" >

            <rect x="3%" y='4.5' width="94%" height="3" fill="maroon" />
            <circle cx="3%" cy="50%" r="4" fill="#c46e08" strokeWidth="3" stroke="maroon" />
            <circle cx="97%" cy="50%" r="4" fill="#c46e08" strokeWidth="3" stroke="maroon" />

        </svg>
    )
};

export const TextDivider = (props) => {
    return (
        <svg width="50" height="35" >
            <rect x="50%" width="1" height="35" fill="black" />
        </svg>
    )
};

export const Image = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // const imageUrl = `http://localhost:3001/${props.imagePath}`;

    const handleImageClick = () => {
        if (props.clickable !== false) {
            setIsOverlayVisible(true);
        }
    }

    const handleContentClick = (event) => {
        event.stopPropagation();
    }

    const [imgWidth, setImgWidth] = useState(0);

    const handleImageLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setImgWidth(400 * naturalWidth / naturalHeight);
    };

    return (
        <div>
            <div
                onClick={handleImageClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: isHovered ? `scale(${props.scaleFactor})` : 'scale(1)',
                    transition: 'transform 0.3s ease',
                    margin: '0px 20px 10px 20px',
                    cursor: props.clickable !== false ? 'pointer' : 'default',
                }}
                className='Image'>
                <img src={props.imageUrl} alt="hidden" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} onLoad={handleImageLoad} />
                <svg width={300 * props.scale} height={400 * props.scale}>
                    <defs>
                        <pattern id={props.id} patternUnits="userSpaceOnUse" width="300" height="400">
                            <image href={props.imageUrl} height="400" x={(300 - imgWidth) / 2} />
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
                        <h1>{props.name}</h1>
                        <div className="Overlay-content-container">
                            <img id={props.id} src={props.imageUrl} height="600px" style={{ margin: '10px' }} alt={props.name} />
                            <div className="Overlay-text" style={{ width: "400px" }}>
                                <p>{props.seasons}</p>
                                <p>{props.descriptionParagraph1}</p>
                                <p>{props.descriptionParagraph2}</p>
                                <p>{props.publishedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

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
                                id={elem.id}
                                name={elem.name}
                                imageUrl={elem.imageUrl}
                                scale={1}
                                scaleFactor={1.047}
                                titleLine1={elem.titleLine1}
                                titleLine2={elem.titleLine2}
                                seasons={seasonsToString(elem.fall, elem.winter, elem.spring, elem.summer)}
                                descriptionParagraph1={elem.descriptionParagraph1}
                                descriptionParagraph2={elem.descriptionParagraph2}
                                publishedDate={elem.publishedDate}
                            />
                        )
                    })}
                </div>
            </div>
            <div style={{ height: '10vh' }} />
        </div>
    )
};

export const Footer = () => {

    return (
        <footer className="Footer">
            <div className="Quarter-div"></div>
            <div className="Quarter-div"></div>
            <div className="Quarter-div"></div>
            <div className="Quarter-div"></div>
        </footer>
    )
};