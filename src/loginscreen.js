import React, { Component } from 'react';
import './loginscreen.css'
import background from './megaman2.jpg'
import quickman from './quickman.png'
import metalman from './metalman.png'
import airman from './airman.gif'
import crashman from './crashman.png'
import bubbleman from './bubbleman.png'
import flashman from './flashman.png'
import woodman from './woodman.png'
import heatman from './heatman.png'
const lettersRegex = /^[0-9a-zA-Z_-\s]+$/;

let bosses = {
  names: {
    quickMan: "Quick Man is a Robot Master from Mega Man 2 who was created by Dr. Wily using Elec Man's design as a base. Quick Man is made of lightweight materials, allowing him to move at very high speeds, but this can easily cause him to be blown away by weapons like the Air Shooter. Though his top running speed is unknown, Quick Man is one of the fastest Robot Masters in the Mega Man series. His Special Weapon is the Quick Boomerang.",

    metalMan: "Metal Man is a Robot Master from Mega Man 2. He was the first Robot Master built by Dr. Wily, created specifically for combat for his revenge against Mega Man. Wily based Metal Man's design on Cut Man. His Special Weapon is the Metal Blade.",

    airMan: "Air Man is a Robot Master from the Mega Man series created by Dr. Wily specially for combat, debuting in Mega Man 2. Air Man has his face built into his torso instead of a head - an unusual design, said to be intimidating. This body supposedly worked out so well from a design perspective that it was dubbed the Air Man type design, and would be used as a basis for future creations such as Needle Man. Air Man's main method of attack is to generate powerful winds with the propeller in his torso",

    crashMan: 'Crash Man, known as Clash Man is a Robot Master from Mega Man 2 that was built by Dr. Wily using the designs of Bomb Man and Guts Man as a base with high speed and agility, the use of high explosives as primary weapons, and clad in a thick armour that can effectively withstand explosions. His Special Weapon is the Crash Bomber',

    bubbleMan: "Bubble Man is a Robot Master from Mega Man 2, and the first aquatic Robot Master created by Dr. Wily for underwater combat. However, a defect in his systems made him unable to walk on land, being only able to move by jumping. When Wily noticed this, he couldn't help but laugh. Despite this flaw, Bubble Man is at home in the water, being able to swim at a remarkable speed. Bubble Man attacks with normal shots from a cannon on his right arm, and can fire his Special Weapon, the Bubble Lead",

    flashMan: "Flash Man is a Robot Master from Mega Man 2 created by Doctor Albert W. Wily to challenge the everlasting idea of controlling time. Flash Man's Special Weapon is the Time Stopper, a unique system that allows him to stop time for brief periods. To supplement his attacking abilities, he is also equipped with a rapid-fire buster on his right arm.",

    woodMan: "Wood Man is a combat Robot Master created by Doctor Albert W. Wily using natural hinoki cypresses. He has a very unique design due to his body being made almost completely out of wood- including some of his mechanisms, along with a thin coating of metal for extra protection. Because of this, Wood Man has great strength and resistance against physical blows, but is somewhat slow and highly vulnerable to fire and cutting weaponry.",

    heatMan: "Heat Man is a combat Robot Master from Mega Man 2 created by Dr. Wily based on Fire Man's design. His body has a box-like shape which resembles a Zippo lighter, with a lid that Heat Man can use to retract his head into for additional protection, but it can sometimes close down onto him unintentionally. He is designed to be highly resistant to sources of heat, including fire and magma, and has a dial in his back that regulates the power of his flames, which he's unaware of. His Special Weapon is the Atomic Fire,",

    
    
  }
  
}


function validate(username) {
  
  return username.length > 0 && username.length < 13 && username.match(lettersRegex)
}
function notValidMessage(username){
  
  if(username.length === 0 || username.length > 12){
    
    return 'Your username must be between 1 and 12 characters long.'
  }
  else if(!username.match(lettersRegex)){
    return 'Your username may only contain letters, numbers and "_ and -"'
  }  
  return;

}


class LoginScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      bossName: '',
      bossDesc: '',
      bossPicture: ''};
    this.formValidation = this.formValidation.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.selectOptions = this.selectOptions.bind(this)
  }

  formValidation(e){
    this.setState({username: e.target.value});
  }

  formSubmit(e){

    this.props.onLogin(this.state.username, this.state.bossPicture, this.state.bossDesc);
    e.preventDefault();
  }

  selectOptions(e){
    console.log(e.target.value)
    if(e.target.value === 'select'){
      this.setState({bossName: '', username: '', bossDesc: '', bossPicture: ''});
    }
    else{
      this.setState({bossName: e.target.value});
    }
    
    if(e.target.value === 'quickMan'){
      this.setState({bossDesc: bosses.names.quickMan, bossPicture: quickman})
    }
    else if(e.target.value === 'metalMan'){
      this.setState({bossDesc: bosses.names.metalMan, bossPicture: metalman})
    }
    else if(e.target.value === 'airMan'){
      this.setState({bossDesc: bosses.names.airMan, bossPicture: airman})
    }
    else if(e.target.value === 'crashMan'){
      this.setState({bossDesc: bosses.names.crashMan, bossPicture: crashman})
    }
    else if(e.target.value === 'bubbleMan'){
      this.setState({bossDesc: bosses.names.bubbleMan, bossPicture: bubbleman})
    }
    else if(e.target.value === 'flashMan'){
      this.setState({bossDesc: bosses.names.flashMan, bossPicture: flashman})
    }
    else if(e.target.value === 'woodMan'){
      this.setState({bossDesc: bosses.names.woodMan, bossPicture: woodman})
    }
    else if(e.target.value === 'heatMan'){
      this.setState({bossDesc: bosses.names.heatMan, bossPicture: heatman})
    }
  
    

  }
  
  render(){
    
    const notValidMessages = notValidMessage(this.state.username);
    const isValid = validate(this.state.username);
    

    return(
    <div id="mainContainer">
      <div id="imageWrapper">
        <img id="backgroundImage" src={background} alt=""/>
      </div>
      <div id="loginContainer">
        <form>
          <label className="notValidMessage" htmlFor="username">Type in your Username and choose a Megaman Boss from the list. </label>
          <br/><br/>
          <input type="text" name="username" id="username" autoComplete="off" value={this.state.username} onChange={this.formValidation}></input>
          <input type="submit" id="loginButton" disabled={!isValid} onClick={this.formSubmit}></input>
          <p className="notValidMessage">{notValidMessages}</p>
          
        </form>


       <div className="mainSelectContainer">
        
        <label className="container">Quick Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="quickMan"></input>
        <span className="radio_span"></span>
        </label>
       
        <label className="container">Metal Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="metalMan"></input>
        <span className="radio_span"></span>
        </label>
        
        <label className="container">Air Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="airMan"></input>
        <span className="radio_span"></span>
        </label>
        
        <label className="container">Crash Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="crashMan"></input>
        <span className="radio_span"></span>
        </label>
        
        <label className="container">Bubble Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="bubbleMan"></input>
        <span className="radio_span"></span>
        </label>
        
        <label className="container">Flash Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="flashMan"></input>
        <span className="radio_span"></span>
        </label>
        
        <label className="container">Wood Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="woodMan"></input>
        <span className="radio_span"></span>
        </label>
        
        <label className="container">Heat Man
        <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="heatMan"></input>
        <span className="radio_span"></span>
        </label>
        
        <label className="container">No Boss
       <input type="radio" className="radio_input" name="bosses" onChange={this.selectOptions} value="select"></input>
       <span className="radio_span"></span>
       </label>
        
         
      </div>
      </div>
      </div>


      
      
      
    
    )
  }
}

export default LoginScreen;
