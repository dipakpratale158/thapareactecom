import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontex";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [], //add products
  all_products: [],//all api data present both allp.. and filte..
  grid_view: true,
  sorting_value: "lowest",
  //filter context
  filters: {
    text: "",  ///the value added hear [name]=value  any value writen seach showing hear 
    category: "all",
    company: "all",
    color: "all",
    /////go filter reduer 
    maxPrice: 0,
    price: 0,
    minPrice: 0,
    
  },
};

export const FilterContextProvider = ({ children }) => {
  //allm api data in product
  const { products } = useProductContext();
//you have add any data use uesreduse
  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function
    
  // sorting function  select dropdown get
  const sorting = (event) => {
      //when i click on select this element
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // update the filter values  any one use so paasss FilterContext.Provider
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };

  // to clear the filter
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });//reduser me acxtion metod ko heat karega
  };

  // to sort the product
     // to sort the product when user click dropdown item item also chane in gridview and list view
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });//new dispach call filter oute karne ke liye
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]); 
  //state.filter me kuch bhi change hota he meanse you have any value enter in search 

  // to load all the products for grid and list view
  //you have to add data from product to filter product use useeffect
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (

    //define hear
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}>
      {children}
    </FilterContext.Provider>
  );
};
//*************useFilterContext
export const useFilterContext = () => {
  return useContext(FilterContext);
};
