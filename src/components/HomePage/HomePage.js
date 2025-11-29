import { useEffect, useState } from "react";
import Category from "./Category/Category";
import FeatureCard from "./FeatureCard/FeatureCard";
import "./HomePage.scss";
import SummuryCard from "./SummuryCard/SummuryCard";
import { getListCategories } from "../../service/ApiService";

const HomePage = () => {
  const [listCategories, setListCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const res = await getListCategories();
    if (res && res.data) {
      setListCategories(res.data.items);
    }
  };
  return (
    <div className="homepage-container">
      <div className="banner-container">
        <img src="/assests/banner.gif" width={"100%"} />
      </div>
      <div className="content-container">
        <div className="hot-books">
          <div className="new-books">
            <SummuryCard />
          </div>
          <div className="best-sellers-of-week">
            <SummuryCard />
          </div>
        </div>
        <div className="features-books-container">
          <FeatureCard className="book-1" />
          <FeatureCard className="book-2" />
        </div>
        <div className="list-categories">
          {listCategories &&
            listCategories.length > 0 &&
            listCategories.map((category) => (
              <Category key={category.cateId} category={category} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
