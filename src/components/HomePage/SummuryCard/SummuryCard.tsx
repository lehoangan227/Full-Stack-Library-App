import "./SummuryCard.scss";
const SummuryCard = () => {
  return (
    <div className="card-container">
      <a href="" className="img-card-container">
        <div className="img-container">
          <img src="/assets/cay-cam-ngot-cua-toi.jpg" />
        </div>
        <div className="img-container">
          <img src="/assets/cay-cam-ngot-cua-toi.jpg" />
        </div>
        <div className="img-container">
          <img src="/assets/cay-cam-ngot-cua-toi.jpg" />
        </div>
      </a>

      <div className="content-card">
        <a href="" className="title-card">
          New Books
        </a>
        <a href="" className="view-all">
          View all (5)
        </a>
      </div>
    </div>
  );
};
export default SummuryCard;
