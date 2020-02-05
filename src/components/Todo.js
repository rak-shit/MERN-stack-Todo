import React, { Component } from 'react'
import axios from 'axios';

export class Todo extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             todos : [],
             item : ""
        }
    }

    changeHandler = (event) => {
        this.setState({item: event.target.value})
    }

    clickHandler = (event) => {
        event.preventDefault()
        console.log(this.state.item)
        axios({
            method: 'post',
            url: 'http://localhost:3000/',
            data: {
              todo: this.state.item,
            }
          });
        this.setState({item:''})
    }

    componentDidMount() {
        axios.get('http://localhost:3000/').then((response) => {
            console.log(response.data.data)
            let data = [];
            console.log(response.data.data.length)
            for(var i =0; i < response.data.data.length; i++){
                data.push(response.data.data[i].todo)
            }
            this.setState({todos: data})
        });
    }
    componentDidUpdate() {
        axios.get('http://localhost:3000/').then((response) => {
            console.log(response.data.data)
            let data = [];
            console.log(response.data.data.length)
            for(var i =0; i < response.data.data.length; i++){
                data.push(response.data.data[i].todo)
            }
            this.setState({todos: data})
        });
    }
  
    render() {
        
        return (
            <div>
                <input type="text" onChange={this.changeHandler}/>
                <button type="submit" onClick={this.clickHandler}>add</button>
                <div>
                    <ul>{this.state.todos.map((todo, index) => <li key={index}>{todo}</li>)}</ul>
                </div>
            </div>
        )
    }
}

export default Todo

