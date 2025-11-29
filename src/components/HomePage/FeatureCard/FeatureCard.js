import "./FeatureCard.scss";
const FeatureCard = () => {
  return (
    <div className="feature-card">
      <div className="featured-tag">FEATURED TITLE</div>
      
      <div className="card-body">
        <div className="book-image">
          <img src="/assests/cay-cam-ngot-cua-toi.jpg" alt="Featured Book" />
        </div>
        
        <div className="book-info">
          <h2>An Oprah's Book Club Pick!</h2>
          <p>
            The bestselling, beloved author returns with her first novel in over a decade, 
            an intimate and profoundly moving look at a long, loving marriage.
          </p>
          <button className="add-to-cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 2L7.8 6M9 2h6m-6 0L7.8 6m8.2-4l1.2 4M15 2l1.2 4m-8.4 0h10.4M7.8 6L6 13m1.8-7L6 13m10.2-7L18 13m-1.8-7L18 13M6 13h12M6 13l-1 8h14l-1-8M6 13l-1 8m2-8h12m1 8H5" />
            </svg>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
export default FeatureCard;
