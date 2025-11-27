import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="banner-container">
        <img src="/assests/banner.gif" width={"100%"} />
      </div>
      <div className="content-container">
        <div className="hot-books">
          <div className="new-books"></div>
          <div className="best-sellers-of-week"></div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
