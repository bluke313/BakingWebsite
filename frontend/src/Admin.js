import './Admin.css';
import { useState, useEffect } from 'react';
import { Link, Image, seasonsToString, backendUrl } from './Components.js'


const AdminImage = (props) => {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isNotesVisible, setIsNotesVisible] = useState(false);
    const [isNotesEditable, setIsNotesEditable] = useState(false);

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
    const [isFeatured, setIsFeatured] = useState(intToBool(props.isFeatured));
    const [notes, setNotes] = useState(props.notes);

    const [selectedImage, setSelectedImage] = useState(null);
    const imageUrl = backendUrl + "/images/" + props.imageUrl;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(imageUrl);


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
        setSelectedImage(null);
        setImagePreviewUrl(imageUrl);
        setIsFeatured(intToBool(props.isFeatured));
        setIsNotesVisible(false);
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
    const handleIsFeaturedChange = (event) => { setIsFeatured(event.target.checked) };
    const handleNotesChange = (event) => { setNotes(event.target.value) };

    const handleUpdate = async () => {
        const userResponse = window.confirm("Are you sure? This will overwrite previous data.");
        if (userResponse) {

            const formData = new FormData();
            formData.append('id', props.id);
            formData.append('image', selectedImage);
            formData.append('newName', name);
            formData.append('title1', title1);
            formData.append('title2', title2);
            formData.append('description1', description1);
            formData.append('description2', description2);
            formData.append('fall', boolToInt(fall));
            formData.append('winter', boolToInt(winter));
            formData.append('spring', boolToInt(spring));
            formData.append('summer', boolToInt(summer));
            formData.append('isFeatured', boolToInt(isFeatured));

            const response = await fetch(`${backendUrl}/update-item`, {
                method: 'PUT',
                body: formData,
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

    const handleDelete = async () => {
        const userResponse = window.confirm("Are you sure? This permanently delete the item.");
        if (userResponse) {
            const response = await fetch(`${backendUrl}/delete-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: props.id,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Item deleted successfully!');
                props.refreshData();
            } else {
                alert(`Error: ${data.error}`);
            }
        }
    };

    const handlePublish = async () => {
        const userResponse = window.confirm("Are you sure? This will make the item viewable on the website.");
        if (userResponse) {
            const response = await fetch(`${backendUrl}/publish-item`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: props.id,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Item published successfully!');
                props.refreshData();
            } else {
                alert(`Error: ${data.error}`);
            }
        }
    };

    const handleUnpublish = async () => {
        const userResponse = window.confirm("Are you sure? This will remove the item from the website.");
        if (userResponse) {
            const response = await fetch(`${backendUrl}/unpublish-item`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: props.id,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Item published successfully!');
                props.refreshData();
            } else {
                alert(`Error: ${data.error}`);
            }
        }
    };

    const [imgWidth, setImgWidth] = useState(0);

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first selected file
        setSelectedImage(file);

        // Preview the image (optional)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result); // Set preview URL
            };
            reader.readAsDataURL(file); // Convert file to base64 string for preview
        }

        setSelectedImage(file); // Store the selected file
    };

    const handleImageLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setImgWidth(200 * naturalWidth / naturalHeight);
    };

    const handleNotesToggle = () => {
        setIsNotesVisible(!isNotesVisible);
        setIsNotesEditable(false);
    };

    const handleNotesSave = async () => {
        const response = await fetch(`${backendUrl}/update-notes`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                id: props.id,
                notes: notes
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Item updated successfully!');
            props.refreshData();
            setIsNotesEditable(false);
        } else {
            alert(`Error: ${data.error}`);
        }
    };

    return (
        <div id="Admin-page">
            <div
                onClick={handleImageClick}
                className='Admin-image'>
                <img src={imageUrl} alt="hidden" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} onLoad={handleImageLoad} />
                <svg width={150} height={200}>
                    <image href={imageUrl} height="200" x={(150 - imgWidth) / 2} />
                </svg>
                {props.name}
            </div>
            {isOverlayVisible && (
                <div className="Admin-overlay">
                    <div className="Admin-overlay-content">
                        <div className="Buttons-div">
                            <button className="Red-button" onClick={handleClose}>Exit</button>
                            <button className="Grey-button" onClick={handleNotesToggle}>Baker Notes</button>
                        </div>
                        <h1>{props.name}</h1>

                        {isNotesVisible ?
                            <>
                                {isNotesEditable ?
                                    <div><textarea
                                        id="Baker-notes-textarea"
                                        type='text'
                                        value={notes}
                                        onChange={handleNotesChange}
                                    /></div>
                                    :
                                    <div>{ notes==="" || notes==null ? "Edit to add notes" : <p id="Baker-notes">{notes}</p>}</div>
                                }
                                <div className="Buttons-div">
                                    <div />
                                    {isNotesEditable ? <button className="Green-button" onClick={handleNotesSave}>Save</button> : <button className="Red-button" onClick={() => setIsNotesEditable(true)}>Edit</button>}
                                </div>
                            </>
                            :
                            <>
                                <div className="Admin-overlay-content-container">
                                    <p className="Input-title">id: {props.id}</p>
                                    {props.isPublished === 1 && <div className="Input-row"><p className="Input-title">featured:</p><input
                                        type='checkbox'
                                        checked={isFeatured}
                                        onChange={handleIsFeaturedChange}
                                    />
                                    </div>}
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
                                    <div className="Input-row" id="Image-input"><p className="Input-title">photo:</p><input
                                        type='file'
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    </div>
                                    <p>{imageUrl}</p>
                                    <div className="Buttons-div">
                                        <div>
                                            <button className="Red-button" onClick={handleDelete}>Delete</button>
                                        </div>
                                        <div>
                                            <button className="Green-button" onClick={handleUpdate}>Save</button>
                                            {props.isPublished === 0 ? <button className="Green-button" onClick={handlePublish}>Publish</button> : <button className="Red-button" onClick={handleUnpublish}>Unpublish</button>}
                                        </div>
                                    </div>
                                </div></>}

                    </div>
                    <div className="Admin-overlay-preview">
                        <h1>Preview</h1>
                        <div style={{ display: 'flex', flex: 'wrap', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                            <Image
                                id={props.id}
                                name={name}
                                imageUrl={imagePreviewUrl}
                                scale={1}
                                scaleFactor={1.1}
                                titleLine1={title1}
                                titleLine2={title2}
                                seasons={seasonsToString(fall, winter, spring, summer)}
                                descriptionParagraph1={description1}
                                descriptionParagraph2={description2}
                                publishedDate={props.publishedDate}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export const Admin = () => {
    const [items, setItems] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        fetch(`${backendUrl}/published`)
            .then((response) => response.json())
            .then((data) => setItems(data.data))
            .catch((error) => console.error('Error fetching data:', error));

        fetch(`${backendUrl}/drafts`)
            .then((response) => response.json())
            .then((data) => setDrafts(data.data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [refreshData]);

    const fetchData = () => {
        setRefreshData(prev => !prev);
    };

    const handleNew = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${backendUrl}/new-draft`, { method: 'POST' });
        } catch (error) {
            console.error("Error creating new draft: ", error);
        }

        fetchData();
    };

    return (
        <div id="Admin">
            <div id="Admin-header">
                <Link text="&#x2190; Home" href="/" />
            </div>

            <svg width="100%" height="3" >
                <rect x="1%" y='0' width="98%" height="3" fill="black" />
            </svg>

            <h1 className="Admin-title">Drafts</h1>
            <div id="Admin-drafts">
                <div id="New-button" onClick={handleNew}>+<div style={{ width: "100%", height: "25px" }} /></div>
                {drafts.map((item) => (
                    <AdminImage
                        refreshData={fetchData}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        scale={1}
                        scaleFactor={1.1}
                        titleLine1={item.titleLine1}
                        titleLine2={item.titleLine2}
                        fall={item.fall}
                        winter={item.winter}
                        spring={item.spring}
                        summer={item.summer}
                        descriptionParagraph1={item.descriptionParagraph1}
                        descriptionParagraph2={item.descriptionParagraph2}
                        isPublished={item.isPublished}
                        publishedDate={new Date().toISOString().split('T')[0]}
                        notes={item.notes}
                    />
                ))}
            </div>

            <svg width="100%" height="3" >
                <rect x="1%" y='0' width="98%" height="3" fill="black" />
            </svg>

            <h1 className="Admin-title">Items</h1>
            <div id="Admin-items">
                {items.map((item) => (
                    <AdminImage
                        refreshData={fetchData}
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        imageUrl={item.imageUrl}
                        scale={1}
                        scaleFactor={1.1}
                        titleLine1={item.titleLine1}
                        titleLine2={item.titleLine2}
                        fall={item.fall}
                        winter={item.winter}
                        spring={item.spring}
                        summer={item.summer}
                        descriptionParagraph1={item.descriptionParagraph1}
                        descriptionParagraph2={item.descriptionParagraph2}
                        isPublished={item.isPublished}
                        isFeatured={item.isFeatured}
                        publishedDate={item.publishedDate}
                        notes={item.notes}
                    />
                ))}
            </div>
        </div>
    );
};



export default Admin;