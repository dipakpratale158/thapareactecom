const filterReducer = (state, action) => {
  /////how to show always show max price in range
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 5 ~ filterReducer ~ priceArr",
        priceArr
      );

      // 1way
      //accept as a parameter(undefind,null,math)
      // console.log(Math.max.apply(null, priceArr));
///reduce method using single number like cart no, totalno
      // let maxPrice = priceArr.reduce(
      //   (initialVal, curVal) => Math.max(initialVal, curVal),
      //   0//always do initial value 0
      // );
      // console.log(
      //   "🚀 ~ file: filterReducer.js ~ line 16 ~ filterReducer ~ maxPrice",
      //   maxPrice
      // );
///using spreadoprater take as a argumnt
      let maxPrice = Math.max(...priceArr);
      console.log(
        "🚀 ~ file: filterReducer.js ~ line 23 ~ filterReducer ~ maxPrice",
        maxPrice
      );
////////////update value hear retun inside initial state se
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        // filters: { ...state.filters, maxPrice:maxPrice, price: maxPrice },

        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,//alll data as it is 1 2 3 4 [2]=11
                                       //       1 11 3 4 
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company, color, price } = state.filters;
//if i am searching any letter to find product
//you can also use start with
//////////////////////////if text value change///////////////
      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }
///////////i///////if/category/value chanege //////////////////////////////////////////
//if i am equal to  category === "all"   not showing if i am clickin all in dropdown 
if (category !== "all") {
        /////////////if categoy value match pass data 
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }
///company me kisi ko bhi click karu filter method work but 
//company all nahi he to show
      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
        );
      }

      if (color !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.colors.includes(color)
        );
      }
////if anyone change price 
//if product price is 0 as it is
      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price == price
        );
      } else {
        //0 se greater originl price uske barabat kam he to filter kardo
        tempFilterProduct = tempFilterProduct.filter(
          //one by one value check and user value set kiya he
          (curElem) => curElem.price <= price
        );
      }
      return {
        ...state,
        //filter_product jo find hone ke bad jitane product he vo
        filter_products: tempFilterProduct,
      };
//////////////////////////user changes cleare button
    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
