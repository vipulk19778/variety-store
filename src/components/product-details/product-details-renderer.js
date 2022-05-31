import React from "react";
import SearchIcon from "@mui/icons-material/Search";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import StarIcon from "@mui/icons-material/Star";

export const ProductRenderer = ({ store }) => {
  const {
    loader,
    value,
    setValue,
    filterArr,
    sorting,
    filterByRating,
    filterByCategory,
  } = store;
  return (
    <div className="productContainer">
      <div className="product-header">
        <div>
          <h1 className="h1">Variety Store</h1>
        </div>
        <div className="searchBarContainer">
          <input
            type="text"
            className="searchBar"
            placeholder="Search Product"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SearchIcon className="searchIcon" />
        </div>

        <div className="sortingContainer">
          Sort By:
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => sorting(e)}
            defaultValue="Featured"
          >
            <option value="None" disabled>
              Sort By
            </option>
            <option value="Featured">Featured</option>
            <option value="Price Low To High">Price Low To High</option>
            <option value="Price High To Low">Price High To Low</option>
            <option value="Rating Low To High">Rating Low To High</option>
            <option value="Rating High To Low">Rating High To Low</option>
          </select>
        </div>

        <div className="filterRatingContainer">
          Filter By Rating:
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => filterByRating(e)}
            defaultValue="All"
          >
            <option value="None" disabled>
              Filter By Rating
            </option>
            <option value="0">All</option>
            <option value="1"> 1 &#9733; &amp; above</option>
            <option value="2"> 2 &#9733; &amp; above</option>
            <option value="3"> 3 &#9733; &amp; above</option>
            <option value="4"> 4 &#9733; &amp; above</option>
          </select>
        </div>

        <div className="filterCategoryContainer">
          Filter By Category:
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => filterByCategory(e)}
            defaultValue="All"
          >
            <option value="None" disabled>
              Filter By Category
            </option>
            <option value="all">All</option>
            <option value="men's">Mens</option>
            <option value="women's">Womens</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>
      {filterArr.length === 0 ? (
        loader()
      ) : (
        <>
          <div className="product-list">
            {filterArr.map((data) => (
              <div className="card product-card" key={data.id}>
                <div>
                  <img
                    src={data.image}
                    alt={data.title}
                    className="product-img"
                  />
                </div>

                <div className="product-details">
                  <div>
                    <h5 className="product-title">{data.title}</h5>
                  </div>
                  <div className="product-rating">
                    {data.rating.rate}
                    <StarIcon className="star-icon" />
                  </div>
                  <div className="product-price">₹{data.price}</div>
                  {/* <div>{data.description}</div> */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
