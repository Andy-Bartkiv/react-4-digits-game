import NumPlates from "./NumPlates";

const OutputList = ({ guess, res, num, opponent=false }) => {
  
  const listStyle = 'output-list' + ((opponent) ? ' opponent' : '');
  const number = (num) ? num : '????'
  
  return (
    <div className={ listStyle }>

      <div className="list-header">
        <NumPlates str={ number.split('').join('') }/>
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
