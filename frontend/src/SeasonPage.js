import './SeasonPage.css'
import { Link, Divider, TextDivider, Image, Footer, seasonsToString, backendUrl } from './Components.js'

const SeasonPage = (props) => {

    return (
        <div id="SeasonPage">
            <header id="SeasonPage-header">
                <Link text="Home" href="/" /><TextDivider />
                <Link text="Fall" href="/Fall" /><TextDivider />
                <Link text="Winter" href="/Winter" /><TextDivider />
                <Link text="Spring" href="/Spring" /><TextDivider />
                <Link text="Summer" href="/Summer" /><TextDivider />
                <Link text="Order" href="https://forms.gle/ZekVfxBqxLscv9ud9" target="_blank" />
            </header>
            <Divider />
            <h1 id="Title">{props.title}</h1>
            <div id="Item-map">
                {props.items.map((elem, i) => {
                    return (
                        <Image
                            key={i}
                            id={elem.id}
                            name={elem.name}
                            imageUrl={`${backendUrl}/images/${elem.imageUrl}`}
                            scale={1}
                            scaleFactor={1.1}
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
            <Footer />
        </div>
    )
}

export default SeasonPage