const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;
    // console.log(
    //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    //   product
    // );


    // tackle the existing product
//filter or find
    let existingProduct = state.cart.find(
      (curItem) => curItem.id == id + color
    );

    if (existingProduct) {
      //*************************************** */

      let updatedProduct = state.cart.map((curElem) => {
//id+color  user ne 2 days bad add kiya to vo and currnid match
        if (curElem.id == id + color) {
          //if same then add itself only increament amounth
          let newAmount = curElem.amount + amount;
//1 to 6 range only so give condition
          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            //if match
            amount: newAmount,
          };
        } else {
          //if not match return as it is
          return curElem;
        }
      });
      //********************************* */
      return {
        ...state,
        //agar existing raha to jo existing product 
        //he usiko update karenge updatedProduct ko
        cart: updatedProduct,
      };
    } else {

    let cartProduct;
//add datat hear when user click item
    cartProduct = {
      id: id + color,
      //beacase product pe all data mil raha he
      name: product.name,
      color,
      amount,
      image: product.image[0].url,
      price: product.price,
      max: product.stock,
    };

    return {
      ...state,
      //data add hear
      //previous state me kuch na ho bad me add ho
      //......state.cart, save rahegfa and cartProduct new add hoga when user click 
      cart: [...state.cart, cartProduct],//go cart file
    }
  }
  }

///////////////////+  - button/////////////////////////
if(action.type==="SET_INCREAMENT"){
  let updatedProduct =state.cart.map((curElem)=>{
    if(curElem.id===action.payload){
    //user ne kiske product ko click kiya
    let incAmount=curElem.amount+1

    if(incAmount>=curElem.max){
      incAmount=curElem.max
    }
    return{
      ...curElem,
      amount:incAmount
    }
  }
  else{
    return curElem
  }
  })
 return  {...state,cart:updatedProduct}
}




if(action.type==="SET_DECREAMENT"){
  let updatedProduct =state.cart.map((curElem)=>{
    if(curElem.id===action.payload){
    //user ne kiske product ko click kiya
    let decAmount=curElem.amount-1

    if(decAmount<=1){
      decAmount=1
    }
    return{
      ...curElem,
      amount:decAmount
    }
  }
  else{
    return curElem
  }
  })
 return  {...state,cart:updatedProduct}
}




  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      // user ne jaha pe click kiya he use chodkar baki dikhav
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      //baki data ko show karo updated variable updatedCart
      cart: updatedCart,
    };
  }


if(action.type==="CLEAR_CART"){
  return {
    ...state,
    cart:[]
  }
}

// ////////cart number
// if (action.type === "CART_TOTAL_ITEM") {
//   let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
//     let { amount } = curElem;

//     initialVal = initialVal + amount;
//     return initialVal;
//   }, 0);

//   return {
//     ...state,
//     total_item: updatedItemVal,
//   };
// }
// /////////total amounth
// if (action.type === "CART_TOTAL_PRICE") {
//   let total_price = state.cart.reduce((initialVal, curElem) => {
//     let { price, amount } = curElem;

//     initialVal = initialVal + price * amount;
//     // 25000 + 0 = 25000
//     // 10199 + 25000 = 121

//     return initialVal;
//   }, 0);

//   return {
//     ...state,
//     total_price,
//   };
// }


if (action.type === "CART_ITEM_PRICE_TOTAL") {
  let { total_item, total_price } = state.cart.reduce(
    (accum, curElem) => {
      let { price, amount } = curElem;

      accum.total_item += amount;
      accum.total_price += price * amount;

      return accum;
    },
    {
      total_item: 0,
      total_price: 0,
    }
  );
  return {
    ...state,
    total_item,
    total_price,
  };
}

  return state;
};

export default cartReducer;
