const Card = ({ children, title }) => {
  return (
    <div className="card">
      <h5
        className="card-header"
        style={{ backgroundColor: "#161616", color: "white" }}
      >
        {title}
      </h5>
      <div className="card-body">
        <div className="row">
          <div className="col-12">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
