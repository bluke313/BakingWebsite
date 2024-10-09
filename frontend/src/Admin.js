import './Admin.css';
import { useState, useEffect } from 'react';
import { Link, Image } from './Components.js'
import testImage from './images/PumpkinBars.jpg'


const AdminImage = (props) => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const boolToInt = (val) => { if (val) return 1; else return 0 };
    const intToBool = (val) => { if (val === 1) return true; else return false };

    const [name, setName] = useState(props.name);
    const [title1, setTitle1] = useState(props.titleLine1);
    const [title2, setTitle2] = useState(props.titleLine2);
    const [description1, setDescription1] = useState(props.descriptionParagraph1);
    const [description2, setDescription2] = useState(props.descriptionParagraph2);
    const [fall, setFall] = useState(intToBool(props.fall));
    const [winter, setWinter] = useState(intToBool(props.winter));
    const [spring, setSpring] = useState(intToBool(props.spring));
    const [summer, setSummer] = useState(intToBool(props.summer));

    const seasonsToString = (fall, winter, spring, summer) => {

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
    }

    const handleImageClick = () => {
        if (props.clickable !== false) {
            setIsOverlayVisible(true);
        }
    };

    const handleClose = () => {
        setIsOverlayVisible(false);
        setName(props.name);
        setTitle1(props.titleLine1);
        setTitle2(props.titleLine2);
        setDescription1(props.descriptionParagraph1);
        setDescription2(props.descriptionParagraph2);
        setFall(intToBool(props.fall));
        setWinter(intToBool(props.winter));
        setSpring(intToBool(props.spring));
        setSummer(intToBool(props.summer));
    };

    const handleNameChange = (event) => { setName(event.target.value) };
    const handleTitle1Change = (event) => { setTitle1(event.target.value) };
    const handleTitle2Change = (event) => { setTitle2(event.target.value) };
    const handleDescription1Change = (event) => { setDescription1(event.target.value) };
    const handleDescription2Change = (event) => { setDescription2(event.target.value) };
    const handleFallChange = (event) => { setFall(event.target.checked) };
    const handleWinterChange = (event) => { setWinter(event.target.checked) };
    const handleSpringChange = (event) => { setSpring(event.target.checked) };
    const handleSummerChange = (event) => { setSummer(event.target.checked) };

    const handleUpdate = async () => {
        const userResponse = window.confirm("Are you sure? This will overwrite previous data.");
        if (userResponse) {
            const response = await fetch('http://localhost:3001/update-item', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: props.id,
                    newName: name,
                    title1: title1,
                    title2: title2,
                    description1: description1,
                    description2: description2,
                    fall: boolToInt(fall),
                    winter: boolToInt(winter),
                    spring: boolToInt(spring),
                    summer: boolToInt(summer),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Item updated successfully!');
                props.refreshData();
            } else {
                alert(`Error: ${data.error}`);
            }
        }
    };

    return (
        <div>
            <div
                onClick={handleImageClick}
                className='Admin-image'>
                <svg width={150} height={200}>
                    <image href={props.href} x="0" y="0" width="150" height="200" />
                </svg>
                {props.name}
            </div>
            {isOverlayVisible && (
                <div className="Admin-overlay">
                    <div className="Admin-overlay-content">
                        <button id="Exit-button" onClick={handleClose}>Exit Without Saving</button>
                        <h1>{`${props.titleLine1} ${props.titleLine2}`}</h1>
                        <div className="Admin-overlay-content-container">
                            <p className="Input-title">id: {props.id}</p>
                            <div className="Input-row"><p className="Input-title">name:</p><input
                                type='text'
                                value={name}
                                onChange={handleNameChange} />
                            </div>
                            <div className="Input-row"><p className="Input-title">titleLine1:</p><input
                                type='text'
                                value={title1}
                                onChange={handleTitle1Change}
                                maxLength={18} />
                            </div>
                            <div className="Input-row"><p className="Input-title">titleLine2:</p><input
                                type='text'
                                value={title2}
                                onChange={handleTitle2Change}
                                maxLength={18} />
                            </div>
                            <div className="Input-row"><p className="Input-title">description1:</p><textarea
                                type='text'
                                value={description1}
                                onChange={handleDescription1Change} />
                            </div>
                            <div className="Input-row"><p className="Input-title">description2:</p><textarea
                                type='text'
                                value={description2}
                                onChange={handleDescription2Change} />
                            </div>
                            <div className="Input-row"><p className="Input-title">fall:</p><input
                                type='checkbox'
                                checked={fall}
                                onChange={handleFallChange}
                            />
                            </div>
                            <div className="Input-row"><p className="Input-title">winter:</p><input
                                type='checkbox'
                                checked={winter}
                                onChange={handleWinterChange}
                            />
                            </div>
                            <div className="Input-row"><p className="Input-title">spring:</p><input
                                type='checkbox'
                                checked={spring}
                                onChange={handleSpringChange}
                            />
                            </div>
                            <div className="Input-row"><p className="Input-title">summer:</p><input
                                type='checkbox'
                                checked={summer}
                                onChange={handleSummerChange}
                            />
                            </div>
                            <button id="Save-button" onClick={handleUpdate}>Save</button>
                        </div>
                    </div>
                    <div className="Admin-overlay-preview">
                        <h1>Preview</h1>
                        <div style={{ display: 'flex', flex: 'wrap', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                            <Image
                                id={props.id}
                                name={name}
                                href={testImage}
                                scale={1}
                                scaleFactor={1.1}
                                titleLine1={title1}
                                titleLine2={title2}
                                fullImage={testImage}
                                seasons={seasonsToString(fall, winter, spring, summer)}
                                descriptionParagraph1={description1}
                                descriptionParagraph2={description2}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export const Admin = () => {
    const [data, setData] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/all')
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [refreshData]);

    const fetchData = () => {
        setRefreshData(prev => !prev);
    };

    return (
        <div id="Admin">
            <div id="Admin-header">
                <Link text="&#x2190; Home" href="/" />
            </div>
            <div id="Admin-container">
                {data.map((item) => (
                    <AdminImage
                        refreshData={fetchData}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        href={testImage}
                        scale={1}
                        scaleFactor={1.1}
                        titleLine1={item.titleLine1}
                        titleLine2={item.titleLine2}
                        fullImage={testImage}
                        fall={item.fall}
                        winter={item.winter}
                        spring={item.spring}
                        summer={item.summer}
                        descriptionParagraph1={item.descriptionParagraph1}
                        descriptionParagraph2={item.descriptionParagraph2}
                    />
                ))}
            </div>
        </div>
    );
};



export default Admin;