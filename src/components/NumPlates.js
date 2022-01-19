import Plate from "./UI/plate/Plate";

const NumPlates = ({ str }) => {
    return (
        <div className="num-plates">
            { str.split('').map( (char, i) => <Plate key={i} char={ char }/>) }
        </div>
    )
}

export default NumPlates
