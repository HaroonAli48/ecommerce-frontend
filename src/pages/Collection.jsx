import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import axios from "axios";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch, backendUrl } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [cat, setCat] = useState([]);
  const [subCat, setSubCat] = useState([]);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/category/get");
      if (res.data.success) {
        setCat(res.data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(
        backendUrl + "/api/category/getSubCategories"
      );
      if (res.data.success) {
        setSubCat(res.data.subCategory);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row pt-10 border-t gap-6 sm:gap-12">
      <aside className="sm:w-64 w-full">
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <h2
            onClick={() => setShowFilter(!showFilter)}
            className="text-xl font-semibold"
          >
            Filters
          </h2>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="sm:hidden focus:outline-none"
          >
            <img
              src={assets.dropdown_icon}
              alt="Toggle Filters"
              className={`w-4 transform transition-transform ${
                showFilter ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          <div className="border border-gray-200 rounded-lg p-4 mb-5 bg-white shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Categories
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              {cat.length > 0
                ? cat.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={cat}
                        onChange={toggleCategory}
                        checked={category.includes(cat)}
                        className="accent-blue-500 w-4 h-4"
                      />
                      {cat}
                    </label>
                  ))
                : "No categories available"}
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Type</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {subCat.length > 0
                ? subCat.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={type}
                        onChange={toggleSubCategory}
                        checked={subCategory.includes(type)}
                        className="accent-blue-500 w-4 h-4"
                      />
                      {type}
                    </label>
                  ))
                : "No subcategories available"}
            </div>
          </div>
        </div>
      </aside>

      <section className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <div className="flex items-center gap-2 text-sm">
            <label className="font-medium text-gray-600">Sort:</label>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded cursor-pointer px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="relevant">Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {filterProducts.length} products found
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              image={item.image}
              id={item._id}
              price={item.price}
              stock={item.stock}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Collection;
