import React, {Component} from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Card,
  CardTitle,
  CardPanel,
} from 'react-materialize';
import MyComponent from './Chart.js';
import Parallax from 'parallax-js'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      listOfJournal: []
    }
  }
  
  componentDidMount() {
    $.get('/me', (user) => {
      if (user) {
        this.setState({ user });
      }
    })
    $.get(`/users/${this.props.currentUserId}/journals`, (data) => {
      if (data) {
        this.setState({listOfJournal: data})
      }
    })
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene);
  }
  
  updateUser = (name, value) => {
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }
  
  submitUser = (event) => {
    const { user } = this.state;
    $.ajax({
      url: `/users/${user.id}`,
      method: 'PUT',
      data: user
    })
    .done(res => {
      this.props.updateUserNickname(res.data.nickname);
      console.log('UPDATED USER: ', res)
    })
  }
  
  render() {
    console.log('listOfJournal', this.state.listOfJournal)
    const { user } = this.state;
    return (
      <div className="profilePage">
        <div className="row">
        
    
              
                < MyComponent listOfJournal={this.state.listOfJournal}/>
           
            
        
        </div>
          
        <div className="profileCard section">
          <Card className="profileContent" title="Profile">
            <Input className="profileNickname" s={6} label="Nickname" validate placeholder={user.nickname} value={user.nickname} onChange={e => this.updateUser('nickname', e.target.value) } alt="nickname"/>
            <Input className="profileEmail" s={6} label="Email" validate placeholder={user.email} value={user.email} onChange={e => this.updateUser('email', e.target.value) } alt="email"/>
            <div>
              <Button waves='light' onClick={this.submitUser}>Update Change</Button>
            </div>
          </Card>
        </div>
      </div>
    
    );
  }
}

export default Profile;