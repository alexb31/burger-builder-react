import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    adress: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    const order = {
    ingredients: this.state.ingredients,
    price: this.state.price,
    customer: {
        name: 'Alex B',
        adress: {
            street: 'test street 1',
            zipCode: '75000',
            country: 'France'
        },
        email: 'test@test.com'
    },
    deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
    .then(response => {this.setState({loading: false});
    this.props.history.push('/');
    })
    .catch(error => this.setState({loading: false}));
  }

  render() {
    let form = (<form>
          <Input inputtype='text' name='name' placeholder='Your name'/>
          <Input inputtype='email' name='email' placeholder='Your email'/>
          <Input inputtype='text' name='street' placeholder='Street'/>
          <Input inputtype='text' name='street' placeholder='Street'/>
          <Input inputtype='text' name='postal' placeholder='Postal Code'/>
          <Button btnType='Success' clicked={this.orderHandler} render={() => (<ContactData ingredients={this.state.ingredients}/>)}>ORDER</Button>
        </form>);
    if (this.state.loading) {
      form = <Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    ); 
  }
}

export default ContactData;