import { createContext, useContext, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import { useEffect } from "react";

const CartContext = createContext();
//2)data define hear

const getlocalcartdata=()=>{
  let newcartdata=localStorage.getItem("dipak")
  if (newcartdata == null || newcartdata == undefined) {
    
    return []
  }else{
    return JSON.parse(newcartdata)
  }
}

const initialState = {
  //first we have to need empty cart all data store
  // cart: [],
  //local storage data ko get kar saku
  cart:getlocalcartdata(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  //1)/create reducer
  const [state, dispatch] = useReducer(reducer, initialState);
//thesexs argument hear parameter made
  const addToCart = (id, color, amount, product) => {
//3)data pass  payload
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };


//
const setIncreament=(id)=>{
dispatch({type:"SET_INCREAMENT",payload:id})
}

const setDecriment=(id)=>{
  dispatch({type:"SET_DECREAMENT",payload:id})
  }



  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };


///////to cleare cart

const clearCart=()=>{
  dispatch({type:"CLEAR_CART"})
}





  useEffect(()=>{
    //data ko convert string 
    // dispatch({ type: "CART_TOTAL_ITEM" });
    // dispatch({ type: "CART_TOTAL_PRICE" });
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" })
    localStorage.setItem("dipak",JSON.stringify(state.cart))
  },[state.cart])
  return (
    ////4)valu previous data as it is  pass addcart fuciion
    <CartContext.Provider value={{ ...state, 
    addToCart, removeItem,clearCart,setIncreament,setDecriment }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };




// import { createContext, useContext, useReducer } from "react";
// import reducer from "../reducer/cartReducer";
// import { useEffect } from "react";

// const CartContext = createContext();

// const getLocalCartData = () => {
//   let newcartdata = localStorage.getItem("dipak");
//   if (!newcartdata) {
//     return [];
//   } else {
//     return JSON.parse(newcartdata);
//   }
// };

// const initialState = {
//   cart: getLocalCartData(),
//   total_item: "",
//   total_amount: "",
//   shipping_fee: 50000,
// };

// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const addToCart = (id, color, amount, product) => {
//     dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
//   };

//   const removeItem = (id) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   };

//   useEffect(() => {
//     localStorage.setItem("dipak", JSON.stringify(state.cart));
//   }, [state.cart]);

//   return (
//     <CartContext.Provider value={{ ...state, addToCart, removeItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCartContext = () => {
//   return useContext(CartContext);
// };

// export { CartProvider, useCartContext };

