import { Icon, Item, Table } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Button} from 'semantic-ui-react'
import * as actions from "../actions/cartAction";
import checkItemIsNew from "../checkItemIsNew";
import {Link} from 'react-router-dom'
const Cart = ({ cart, dispatch }) => {
  const [grandTotal, changeGrandTotal] = useState(0);
  //console.log(grandTotal.length)
  let tot = 0;
  console.log(grandTotal);

  useEffect(() => {
    console.log(cart.length);
    cart.map((cartItem) => {
      //changeGrandTotal([...grandTotal,{...cartItem}])
      //console.log(cartItem);
      tot += cartItem.price * cartItem.qty;
    });
    console.log("useEffect:" + tot);
    changeGrandTotal(tot);
  }, [cart]);
  const callMe=()=>{
    cart.map((cartItem)=>dispatch(actions.removeAction({...cartItem})))
  }
  return (
    <div>
      <Table
        padded
        style={{ width: "80%", marginLeft: "120px", marginTop: "50px" }}
      >
        <Table.Header className="center aligned">
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {/* {console.log(cart)} */}
        {cart.map((cartItem) => (
          <Table.Body>
            <Table.Row>
              <Table.Cell className="center aligned">
                <Item>
                  <img
                    class="ui small circular image"
                    src={cartItem.image}
                    style={{ left: "50%", transform: "translateX(-50%)" }}
                  ></img>
                  <div>
                    <Item.Header style={{ fontSize: "20px" }}>
                      {cartItem.title}{" "}
                    </Item.Header>
                  </div>
                  <div>
                    <Item.Description>{cartItem.description}</Item.Description>
                  </div>
                </Item>
              </Table.Cell>
              <Table.Cell
                style={{ fontSize: "20px" }}
                className="center aligned"
              >
                <Icon name="dollar" />
                {cartItem.price}
              </Table.Cell>
              <Table.Cell className="center aligned">
                <div>
                  <button
                    class="ui black icon button"
                    onClick={() => {
                      if (cartItem.qty == 1)
                        dispatch(actions.removeAction(cartItem));
                      else dispatch(actions.subAction(cartItem));
                    }}
                  >
                    <i class="minus icon"></i>
                  </button>
                  {""}
                  {cartItem.qty}{" "}
                  <button
                    class="ui black icon button"
                    size="small"
                    onClick={() => dispatch(actions.addAction(cartItem))}
                  >
                    {/* modifyCart({...cartItem,_id:cartItem.id},'add')}>} */}
                    <i class="plus icon"></i>
                  </button>
                </div>
              </Table.Cell>
              <Table.Cell
                style={{ fontSize: "20px" }}
                className="center aligned"
              >
                <Icon name="dollar" />
                {cartItem.price * cartItem.qty}
                {/* {callMe(cartItem.price*cartItem.qty)} */}
              </Table.Cell>
              <Table.Cell>
                <button
                  class=" ui red icon  button"
                  onClick={() => dispatch(actions.removeAction(cartItem))}
                >
                  <i class="times circle icon"></i>
                </button>
              </Table.Cell>
            </Table.Row>
            <Table.Row></Table.Row>
          </Table.Body>
        ))}
        <Table.Body>
          <Table.Row>
            <Table.Cell className="center aligned">
              <Item></Item>
            </Table.Cell>
            <Table.Cell className="center aligned">
              <Item></Item>
            </Table.Cell>
            <Table.Cell className="center aligned">
              <Item>{cart.length == 0 && <h3>Cart is empty</h3>}</Item>
            </Table.Cell>
            <Table.Cell className="center aligned">
              <Item>{cart.length > 0 && grandTotal}</Item>
            </Table.Cell>
            <Table.Cell >
              {cart.length > 0 && (
                <><Link to="/checkout"><button class=" ui green icon button">Checkout</button></Link>
                <Button primary onClick={callMe}>Clear cart</Button></>
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

const stateToProps = (cartState) => ({
  cart: cartState.cartReducer,
});

export default connect(stateToProps)(Cart);
