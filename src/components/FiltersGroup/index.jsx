import { BsSearch } from "react-icons/bs";
import "./index.css";

const FiltersGroup = ({
  searchInput,
  changeSearchInput,
  enterSearchInput,
  clearFilters,
  categoryOptions,
  activeCategoryId,
  changeCategory,
  ratingsList,
  activeRatingId,
  changeRating,
}) => {
  const handleSearchChange = (e) => changeSearchInput(e.target.value);
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") enterSearchInput();
  };

  const renderSearchInput = () => (
    <div className="search-input-container">
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
      />
      <BsSearch className="search-icon" />
    </div>
  );

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">
        {categoryOptions.map(({ categoryId, name }) => {
          const isActive = categoryId === activeCategoryId;
          const categoryClassName = isActive
            ? "category-name active-category-name"
            : "category-name";
          return (
            <li
              className="category-item"
              key={categoryId}
              onClick={() => changeCategory(categoryId)}
            >
              <p className={categoryClassName}>{name}</p>
            </li>
          );
        })}
      </ul>
    </>
  );

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">
        {ratingsList.map(({ ratingId, imageUrl }) => {
          const isActive = ratingId === activeRatingId;
          const ratingClassName = isActive ? "and-up active-rating" : "and-up";
          return (
            <li
              className="rating-item"
              key={ratingId}
              onClick={() => changeRating(ratingId)}
            >
              <img
                src={imageUrl}
                alt={`rating ${ratingId}`}
                className="rating-img"
              />
              <p className={ratingClassName}>& up</p>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingsFilters()}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FiltersGroup;
