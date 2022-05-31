import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductRenderer } from "./product-details-renderer";
import "./product-details-styles.css";

export const ProductContainer = () => {
  const [listItem, setListItem] = useState([]);

  const [copyListItem, setCopyListItem] = useState([]);

  const [value, setValue] = useState("");

  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    loadListItem();
  }, []);

  const loadListItem = async () => {
    return await axios
      .get(url)
      .then((response) => {
        setListItem(response.data);
        setCopyListItem(response.data);
      })
      .catch((err) => console.log(err.message));
  };

  const loader = () => {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  };

  let filterArr = [];

  if (value === "") {
    filterArr = listItem;
  } else {
    filterArr = listItem.filter((obj) => {
      let title = obj.title.toLowerCase();
      let data = title.includes(value.toLowerCase());
      return data;
    });
  }

  const filterByRating = (e) => {
    const value = parseInt(e.target.value);
    if (value !== 0) {
      const temp = copyListItem.filter((obj) => {
        return obj.rating.rate >= value;
      });
      setListItem(temp);
    } else {
      setListItem(copyListItem);
    }
  };

  const filterByCategory = (e) => {
    const value = e.target.value;

    if (value !== "all") {
      if (value === "men's clothing") {
        const temp = copyListItem.filter((obj) => {
          return obj.category === value;
        });
        setListItem(temp);
      } else {
        const temp = copyListItem.filter((obj) => {
          return obj.category.includes(value.toLowerCase());
        });
        setListItem(temp);
      }
    } else setListItem(copyListItem);
  };

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

  const noSorting = () => {
    let temp = listItem;
    temp.sort(function (objA, objB) {
      return objA.id - objB.id;
    });
    setListItem([...temp]);
  };

  const sorting = (e) => {
    const value = e.target.value;
    if (value === "Price Low To High") sortPriceAsc();
    else if (value === "Price High To Low") sortPriceDesc();
    else if (value === "Rating Low To High") sortRatingAsc();
    else if (value === "Rating High To Low") sortRatingDesc();
    else if (value === "Featured") noSorting();
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
    sorting,
    filterByRating,
    filterByCategory,
  };

  return <ProductRenderer store={store} />;
};
