let possibleCombinationSum = (arr, n) => {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  let listSize = arr.length, combinationsCount = (1 << listSize)
  for (let i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (let j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
      <button className="btn btn-success" onClick = {props.acceptAnswer}>
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
  	<div className="col-2 text-center">
    	{button}
      <br />
      <br />
      <button className="btn btn-warning btn-sm" 
      	disabled={props.redraws === 0}
      	onClick={props.redraw}> 
      	<i className="fa fa-sync"></i> {props.redraws}
      </button>
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
    if(props.usedNumbers.indexOf(number) >= 0){
			return "used";
    }
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

const DoneFrame = (props) => {
	return(
  	<div className="text-center">
    	<h2> {props.doneStatus} </h2>
    </div>
  );
  
}

class Game extends React.Component {
	static randomNumber = () => 1+ Math.floor(Math.random()*9);
  
	state = {
  selectedNumbers: [],
  numberOfStars: Game.randomNumber(),
  isCorrectAnswer: null,
  usedNumbers: [],
  redraws: 5,
  doneStatus: null
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
  
  acceptAnswer = () => {
  	
    this.setState(prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        isCorrectAnswer: null,
        numberOfStars: Game.randomNumber()
      }), this.updateDoneStatus
    );
  };
  
  redraw = () => {
		this.setState(prevState => ({
    	 selectedNumbers: [],
        isCorrectAnswer: null,
        numberOfStars: Game.randomNumber(),
        redraws: prevState.redraws - 1
    }), this.updateDoneStatus
    );
	};
  
  updateDoneStatus = () => {
  	this.setState((prevState) => {
    	if(prevState.usedNumbers.length === 9) {
      	return {doneStatus: "Done. Nice!"};
      }
      
      if(prevState.redraws === 0 && !this.possibleSolutions(prevState)){
      	return {doneStatus: "Game Over!"};
      }
      
    });
  }
  
  possibleSolutions = ({numberOfStars, usedNumbers}) => {
  	const possibleNumbers =_.range(1,10).filter(number =>
    usedNumbers.indexOf(number) === -1
    );
    
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  };
  

	render () {
  	const {
    	numberOfStars, 
      selectedNumbers,
      isCorrectAnswer, 
      usedNumbers,
      redraws,
      doneStatus} = this.state;
      
  	return (
    	<div className="container ">
      	<h3> Play Nine </h3>
        <hr />
        <div className="row">	
        	<Stars numberOfStars={numberOfStars}/> 
        	<Button selectedNumbers={selectedNumbers} 
          isCorrectAnswer={isCorrectAnswer}
          acceptAnswer={this.acceptAnswer}
          checkAnswer={this.checkAnswer}
          redraw={this.redraw}
          redraws={redraws}
          />
        	<Answer selectedNumbers={selectedNumbers} 
          unselectNumber={this.unselectNumber}/>
        </div>  
        <br />
        
        {
        doneStatus ?
        	<DoneFrame doneStatus={doneStatus}/>  :
          <Numbers selectedNumbers={selectedNumbers} 
          selectNumber={this.selectNumber}
          usedNumbers={usedNumbers}/>
        }
        	
      	
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


//////////////////////////////////////////////////
////CSS
<!--
.mountNode {
  color: #333;
}

.fa-star{
margin: 0.5em;
font-size: 20px;
}

span {
display: inline-block;
margin: 0.5em;
text-align: center;
background-color: #ccc;
width: 24px;
border-radius: 50%;
}

.selected{
  background-color: #eee;
  color: #ddd;
  cursor: not-allowed;
}

.used{
  background-color: #aaddaa;
  color: #99bb99;
  cursor: not-allowed;
}
-->

ReactDOM.render(<App />, mountNode);
