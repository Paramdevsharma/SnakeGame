import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Snake from './snake';
import Food from './Food'

const getRandomCoordinates = () =>{
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x,y]
}

class App extends Component {
  state = {  direction: 'RIGHT',
  food : getRandomCoordinates(),
  speed: 200,
  snakedots :[
    [0,0],
    [2,0],
    [4,0]
  ],
  score : 0

}
  
  componentDidMount(){
    this.intervalset = setInterval(this.movesnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }
  componentDidUpdate(){
    this.checkifout();
    this.checkifcoll();
    this.checkifeat();
  }


  onkeydown = (e) =>{
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
    }

  }
  movesnake = () =>{
    let dots  = [...this.state.snakedots];
    let head = dots [dots.length - 1];
    switch(this.state.direction){
      case 'RIGHT':
        head = [head[0] + 2,head[1]];
        break;
       case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakedots :dots
    })
  }
  checkifout(){
    let head = this.state.snakedots[this.state.snakedots.length-1];
    if(head[0] >= 100 || head[1] >=100 || head[0] < 0 || head[1] < 0){
      this.ongame();
       
    }
  }
  checkifcoll(){
    let snake = [...this.state.snakedots];
    let head = snake[snake.length - 1 ];
    snake.pop();
    snake.forEach(dot=>{
      if (head[0] == dot[0] && head[1] == dot[1] ){
        this.ongame();
      }
    })
  }
  ongame(){
    alert(`Game Over . Snake length is ${this.state.snakedots.length}`);
    clearInterval(this.intervalset);
    this.setState({  direction: 'RIGHT',
    food : getRandomCoordinates(),
    speed: 200,
    snakedots :[
      [0,0],
      [2,0],
      [4,0]
    ],
    score : 0
  });
    this.intervalset = setInterval(this.movesnake, 200);



  }
  checkifeat(){
    let head = this.state.snakedots[this.state.snakedots.length-1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]){
      this.setState({
        food : getRandomCoordinates()
      })
      this.enlargesnake();
      this.ispeed();
      clearInterval(this.intervalset);
      console.log(this.state.speed);
      this.intervalset = setInterval(this.movesnake, this.state.speed);

      

    }
  }
  enlargesnake(){
    let newsnake =[...this.state.snakedots];
    newsnake.unshift([])
    this.setState({
      snakedots : newsnake
    })
  }
  ispeed(){
    if(this.state.speed > 10 ){
      this.setState({
        speed : this.state.speed - 10,
        score : this.state.score + 1
      })
    }
  }

  render(){
  return (
    <div className = "game-a">
      <Snake snakeDots = {this.state.snakedots}/>
      <Food dot={this.state.food}/>
     <h2>Score : {this.state.score}</h2>
    </div>
    
  );
  }
}

export default App;
