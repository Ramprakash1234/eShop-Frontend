const cartReducer=(cartState=[],action)=>{
    if(action.type=='NEW_ITEM'){
        const newState=[...cartState,{...action.payload,id:action.payload._id,qty:1}];
            return newState;
    }
    else if(action.type=='ADD_ITEM'){
        const newState=cartState.map((cartItem)=>{
            if(cartItem._id==action.payload._id)
                return {...cartItem,qty:cartItem.qty+1}
            else
                return {...cartItem}
        })
        return newState;
    }else if(action.type=='SUB_ITEM'){
        const newState=cartState.map((cartItem)=>{
            if(cartItem._id==action.payload._id)
                return {...cartItem,qty:cartItem.qty-1}
            else
                return {...cartItem}
        })
        return newState;
    }else if(action.type=='REMOVE_ITEM'){
        const newState=cartState.filter((cartItem)=>
        cartItem._id!=action.payload._id)
        return newState
    }
    return cartState;
}
export default cartReducer