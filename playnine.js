const Stars = (props) => {
	//const numberOfStars =1+ Math.floor(Math.random()*9);
  //let stars = [];
  
  //for(let i=0; i<numberOfStars; i++){
  //	stars.push(<i key={i} className="fa fa-star"></i>);
  //}
  
	return (
  	<div className="col-5">
    	{
      _.range(props.numberOfStars).map(i=>
      	<i key={i} className="fa fa-star"></i>
      )
      }
    </div>
  );
}

const Button = (props) => {
	let button;
  switch(props.isCorrectAnswer){
  		case true:
    	button = 
      <button className="btn btn-success" >
      	<i className = "fa fa-check"></i>
      </button>;
      break;
      case false:
    	button = 
      <button className="btn btn-danger" >
      	<i className = "fa fa-times"></i>
      </button>;
      break;
      default:
    	button = <button className="btn" 
      disabled={props.selectedNumbers.length === 0}
      onClick={props.checkAnswer}
      >=</button>;
      break;
  
  }

	return (
  	<div className="col-2">
    	{button}
    </div>
  );
}


const Answer = (props) => {
	return (
  	<div className="col-5">
    	{
      props.selectedNumbers.map((number, i) => 
      	<span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
      )
      }
    </div>
  );
}

const Numbers = (props) => {
	const numberClassName = (number) => {
    if(props.selectedNumbers.indexOf(number)>=0){
			return "selected";
    }
  }
	return (
  	<div className="card text-center">
    	<div>
  			{
        	Numbers.list.map((number, i) => 
            <span key={i} className={numberClassName(number)} 
            onClick={() => props.selectNumber(number)}>
            	{number}
            </span>)
        }
  		</div>
    </div>
  );
}

Numbers.list = _.range(1,10);

class Game extends React.Component {
	state = {
  selectedNumbers: [],
  numberOfStars: 1+ Math.floor(Math.random()*9),
  isCorrectAnswer: null,
  };
  
  selectNumber = (clickedNumber) => {
  if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0 ){return;}
  this.setState(prevState => 
  	({isCorrectAnswer: null,
    selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)})
  );
  }
  
  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => 
    	(
      {isCorrectAnswer: null,
      	selectedNumbers: prevState.selectedNumbers.filter(number => number != clickedNumber)
      }
      )
    );
  }
  
  checkAnswer = () => {
  	this.setState(prevState => ({
		isCorrectAnswer: 
    	prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    })
    )
  }
  
  
  
	render () {
  	const {numberOfStars, selectedNumbers,isCorrectAnswer } = this.state;
  	return (
    	<div className="container ">
      	<h3> Play Nine </h3>
        <hr />
        <div className="row">	
        	<Stars numberOfStars={numberOfStars}/> 
        	<Button selectedNumbers={selectedNumbers} 
          isCorrectAnswer={isCorrectAnswer}
          checkAnswer={this.checkAnswer}
          />
        	<Answer selectedNumbers={selectedNumbers} 
          unselectNumber={this.unselectNumber}/>
        </div>  
        <br />
        	<Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber}/>
        
      </div>
    );
  }

} 


class App extends React.Component {
	render() {
  	return(
    	<div>
      	<Game />
      </div>
    );
  }
}


ReactDOM.render(<App />, mountNode);
