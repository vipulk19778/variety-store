import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductRenderer } from "./product-details-renderer";
import "./product-details-styles.css";

export const ProductContainer = () => {
  const [listItem, setListItem] = useState([]);

  const [value, setValue] = useState("");

  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    loadListItem();
  }, []);

  const loadListItem = async () => {
    return await axios
      .get(url)
      .then((response) => setListItem(response.data))
      .catch((err) => console.log(err.message));
  };

  const loader = () => {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    );
  };

  let filterArr = [];

  if (value === "") {
    filterArr = listItem;
  } else {
    filterArr = listItem.filter((obj) => {
      let rating = obj.rating.rate;
      let category = obj.category.toLowerCase();
      let data = rating >= value || category.includes(value.toLowerCase());
      return data;
    });
  }

  const sortPriceAsc = () => {
    let temp = listItem;
    temp.sort(function (objA, objB) {
      return objA.price - objB.price;
    });
    setListItem([...temp]);
  };
  const sortPriceDesc = () => {
    let temp = listItem;
    temp.sort(function (objA, objB) {
      return objB.price - objA.price;
    });
    setListItem([...temp]);
  };

  const sortRatingAsc = () => {
    let temp = listItem;
    temp.sort(function (objA, objB) {
      return objA.rating.rate - objB.rating.rate;
    });
    setListItem([...temp]);
  };
  const sortRatingDesc = () => {
    let temp = listItem;
    temp.sort(function (objA, objB) {
      return objB.rating.rate - objA.rating.rate;
    });
    setListItem([...temp]);
  };

  const store = {
    loader,
    value,
    setValue,
    filterArr,
    sortPriceAsc,
    sortPriceDesc,
    sortRatingAsc,
    sortRatingDesc,
  };

  return <ProductRenderer store={store} />;
};
