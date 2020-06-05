import {emojify} from 'react-emojione';
import React, { Component } from 'react';
import './App.css';
import background from './megaman2.jpg'
import LoginScreen from './loginscreen.js';
import io from 'socket.io-client';
import moment from 'moment'
const Linkify = require('linkifyjs/react');

function timestampConverter(timestamp){

  return (moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'))
}

function convertURL(str){
  let options = {/* … */};
  let eOptions = {style: {height: 18, width: 18, position: 'relative', top: '-1px'}}
  let content = emojify(str, eOptions);
  
  
  return <Linkify tagName="span" options={options}>{content}</Linkify>;
  }

function scrollBottom(){
  let element = document.querySelector("#chatContainer");
      element.scrollTop = element.scrollHeight;
}

function createListItems(messages){

  console.log(messages)
  
  const listItems = messages.map(({username, content, id, date}) => {
  
    return <li key={id.toString()}><span className="date">{timestampConverter(date)}</span><br></br><span className="chatText">{username + ': '}{convertURL(content)}</span><br></br><br></br></li>
       
  })
  return listItems
  
} 
  
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      bossPicture: '',
      bossDesc: '',
      messages: [],
      
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.logOff = this.logOff.bind(this);
    this.keyPressed = this.keyPressed.bind(this)
    
  }

  

  componentDidMount(){
    this.socket = io('http://localhost:3010/');
    this.socket.on("messages", (data) => {
      this.setState({ messages: data });
    })
    
    this.socket.on("new_message", (data) => {
      const messages = [...this.state.messages, data]
      messages.reverse()
      this.setState({messages: messages});

    });
    

   
  }
  componentWillUnmount(){
    this.socket.disconnect()
  }

  sendMessage(){
    
    document.querySelector('#contentList').innerhtml= '';
    let messageToSend = document.querySelector('#inputSend');
    messageToSend = messageToSend.value
    
    this.socket.emit('message', {
      
      username: this.state.username, 
      content: messageToSend},
        
      (response) => {

        if(response.status === 'success'){
          this.setState({messages: [...this.state.messages, response.data.newMessage]}, scrollBottom)
         
        }
      
      });
     document.querySelector('#inputSend').value = '';
     
  }
   
  onLogin(username, picture, bossDesc) {
    this.setState({username: username, bossPicture: picture, bossDesc: bossDesc}, scrollBottom);
    
  }

  logOff(){
  
    this.setState({username: ''})
  
  }

  keyPressed(e){
    if(e.keyCode === 13){
      this.sendMessage();
    }
  }

  render() {
   
    if(!this.state.username){
     
      return(
        <LoginScreen onLogin={this.onLogin}></LoginScreen>
      )
    }

    else{
      
      const oldItems = createListItems(this.state.messages);  
     
      return (
        
        <div className="App">
        <div id="bossDescWrapper">
            <p id="bossDesc">{this.state.bossDesc}</p>
            </div>
        <div id="imageWrapper">
        <img id="backgroundImage" src={background} alt=""/>
      </div>
        
        <div id="mainChatContainer">
        
        
        <div id="userNameContainer">
          <p id="usernameText">Your Username is: {this.state.username}<img id="bossImage" width="32" height="32" src={this.state.bossPicture} alt=""></img></p>
          
        </div>
        
        <div id="goBackToLoginContainer">
            <button id="goBackToLoginButton" onClick={this.logOff}>Log off</button>
          </div>
          <div id="chatContainer">
          
            <ul id="contentList">{oldItems}</ul>
          </div>
          </div>
          <div id="newMessageContainer">
          <div id="mainInputSendContainer">
            <input id="inputSend" type="input" minLength="1" maxLength="200" autoComplete="off" onKeyDown={this.keyPressed}></input>
            
            <button id="sendMessageButton" onClick={this.sendMessage}>Send</button>
            
            </div>
            
          </div>
          
          </div>
          
      )
      
    }
    
  }
}

export default App;
