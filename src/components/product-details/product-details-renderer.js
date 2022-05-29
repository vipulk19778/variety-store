import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export const ProductRenderer = ({ store }) => {
  const {
    loader,
    value,
    setValue,
    filterArr,
    sortPriceAsc,
    sortPriceDesc,
    sortRatingAsc,
    sortRatingDesc,
  } = store;
  return (
    <div className="productContainer">
      <h1 className="h1">Variety Store</h1>
      <div className="searchBarContainer">
        <input
          type="text"
          className="searchBar"
          placeholder="Search by rating or category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <SearchIcon className="searchIcon" />
      </div>
      <table className="table table-responsive">
        <thead>
          <tr>
            <th scope="col" className="col-lg-2">
              Image
            </th>
            <th scope="col" className="col-sm-2 col-lg-1">
              Title
            </th>
            <th scope="col" className=" arrowIconContainer">
              <ArrowDropUpIcon onClick={sortPriceDesc} />
              Price
              <ArrowDropDownIcon onClick={sortPriceAsc} />
            </th>
            <th scope="col" className="col-xs-4 col-lg-6">
              Description
            </th>
            <th scope="col">Category</th>
            <th scope="col" className="arrowIconContainer ">
              <ArrowDropUpIcon onClick={sortRatingDesc} />
              Rating
              <ArrowDropDownIcon onClick={sortRatingAsc} />
            </th>
          </tr>
        </thead>
        <tbody>
          {filterArr.length === 0 ? (
            <tr>
              <td>{loader()}</td>
            </tr>
          ) : (
            filterArr.map((data) => (
              <tr key={data.id} className="singleProduct">
                <td>
                  <a
                    href={data.image}
                    title="Click me"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={data.image} alt="Product" />
                  </a>
                </td>
                <td className="title">{data.title}</td>
                <td>{data.price}</td>
                <td className="description">{data.description}</td>
                <td>{data.category}</td>
                <td>{data.rating.rate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
