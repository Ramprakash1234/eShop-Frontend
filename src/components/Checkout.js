import { React, useEffect, useState } from "react";
import {connect} from 'react-redux'
import * as actions from '../actions/cartAction'
import { useHistory } from "react-router";

import {
  Form,
  Input,
  Grid,
  TextArea,
  Button,
  Table,
  Item,
  Icon,
} from "semantic-ui-react";

import { Link } from "react-router-dom";

const Checkout = ({ cart,dispatch }) => {
  const history=useHistory();
  const [userInfo,changeUserInfo]=useState({});
  const [totalAmount,calculateTotalAmount]=useState(0);
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  useEffect(()=>{  
    calculateTotalAmount(cart.reduce((tot,cartItem)=>tot+(cartItem.price*cartItem.qty),0));
  },[])
    const stateOptions = [
    { text: "Andhra", value: "Andhra" },
    { text: "Delhi", value: "Delhi" },
    { text: "Gujarat", value: "Gujarat" },
    { text: "Kerala", value: "Kerala" },
    { text: "Karnataka", value: "Karnataka" },
    { text: "Mumbai", value: "Mumbai" },
    { text: "Maharastra", value: "Maharastra" },
    { text: "Punjab", value: "Punjab" },
    { text: "TamilNadu", value: "TamilNadu" },
  ];

  const [emailInput, setEmail] = useState("");
  const [validEmail, validateEmail] = useState(true);
  const [numberInput, setNumber] = useState("");
  const [validNumber, validateNumber] = useState(true);
  const [cityInput, setCity] = useState("");
  const [validCity, validateCity] = useState(true);
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(userInfo)
    await dispatch(actions.userAction(userInfo))
    history.push({ pathname: "/payment" });
  };

  // const onChange = (event, result) => {
  //   const { name, value } = result || event.target;

  //   setValues({ ...values, [name]: value });
  // };
  const onChange = (e, label) => {
    const value=e.target.value || e.target.innerText
    changeUserInfo({...userInfo,[label]:value})
    
  };
  useEffect(()=>{
    changeUserInfo({...userInfo,orderAmount:totalAmount})
  },[totalAmount])
  useEffect(()=>{
    console.log(userInfo);
  },[userInfo])

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8} style={{ paddingRight: "50px" }}>
          <Table
            padded
            style={{ width: "80%", marginLeft: "120px", marginTop: "50px" }}
          >
            <Table.Header className="center aligned">
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>

                <Table.HeaderCell>Price</Table.HeaderCell>

                <Table.HeaderCell>Total</Table.HeaderCell>

                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {cart.map((cartItem) => (
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="center aligned">
                    <Item>
                      <div>
                        <Item.Header style={{ fontSize: "20px" }}>
                          {cartItem.title} 
                        </Item.Header>
                      </div>

                    </Item>
                  </Table.Cell>

                  <Table.Cell
                    style={{ fontSize: "20px" }}
                    className="center aligned"
                  >
                    <Icon name="dollar" />

                    {cartItem.price} * {cartItem.qty}
                  </Table.Cell>

                  <Table.Cell
                    style={{ fontSize: "20px" }}
                    className="center aligned"
                  >
                    <Icon name="dollar" />

                    {cartItem.price * cartItem.qty}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </Grid.Column>

        <Grid.Column width={8} style={{ paddingRight: "30px" }}>
          <h1 style={{ textAlign: "center" }}>Checkout Form</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                icon="envelope"
                iconPosition="left"
                label="Email"
                placeholder="Email Address"
                required
                value={emailInput}
                required
                error={
                  validEmail
                    ? false
                    : {
                        content: "Please enter a valid email address.",
                      }
                }
                onChange={(e)=>{
                  onChange(e,'username');
                  setEmail(e.target.value);
                  validateEmail(validEmailRegex.test(e.target.value));
                }}
              />

              <Form.Input
                type="text"
                icon="mobile"
                iconPosition="left"
                label="Mobile Number"
                placeholder="Mobile Number"
                value={numberInput}
                required
                onChange={(e)=>{
                  onChange(e,'mobileNumber');
                  setNumber(e.target.value);
                  validateNumber(
                    e.target.value.length == 10 && !isNaN(e.target.value));
                }}
                error={
                  validNumber
                    ? false
                    : {
                        content: "Please enter a 10 digit mobile number",
                        pointing: "above",
                      }
                }
              />
            </Form.Group>

            <Form.Field
              id="form-textarea-control-address"
              control={TextArea}
              label="Address"
              placeholder="Address"
              required
              onChange={(e)=>onChange(e,'address')}
            />

            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-city"
                control={Input}
                label="City/District/Town"
                placeholder="City/District/Town"
                required
                onChange={(e)=>onChange(e,'city')}
              />
              <Form.Select
                fluid
                options={stateOptions}
                label="State"
                placeholder="Select-State"
                onChange={(e)=>onChange(e,'state')}
              />
            </Form.Group>

            <Form.Field
              id="form-input-control-city"
              control={Input}
              label="Amount"
              value={totalAmount}
              placeholder="Amount"
              readOnly
              required
              onChange={(e)=>onChange(e,'orderAmount')}
            />

              <Button type="submit" >
                Proceed to Pay
              </Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps=(cartState)=>({
    cart:cartState.cartReducer
  })
  // const mapDispatchToProps=(dispatch)=>{
  //   return bindActionCreators(actions, dispatch)
  // }

export default connect(mapStateToProps)(Checkout);
