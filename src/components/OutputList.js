import NumPlates from "./NumPlates";

const OutputList = ({ guess, res, num }) => {
    return (
      <div className='output-list'>

        <div className="list-header">
          <NumPlates str={ num.split('').join('') } color='orange'/>
        </div>

        <div className="list-guess">
          { guess.map((g, i) => <NumPlates key={i} str={ g }/>) }
        </div>

        <div className="list-res">
          { res.map((r, i) => <NumPlates key={i} str={ "-"+r }/>) }
        </div>
      </div>
    )
}

export default OutputList;
