import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  var floor = Math.floor(value);
  var max = 5;
  var ceil = Math.ceil(value);
  var difference = ceil - floor;
  var rows = [];
  var index = 0;

  for (var m = 0; m < floor; m++) {
    rows.push(<i key={index} style={{ color }} className="fas fa-star"></i>);
    index += 1;
  }

  if (difference > 0) {
    rows.push(
      <i key={index} style={{ color }} className="fas fa-star-half-alt"></i>
    );
    index += 1;
  }

  for (var n = 0; n < max - floor - difference; n++) {
    rows.push(<i key={index} style={{ color }} className="far fa-star"></i>);
    index += 1;
  }

  return (
    <div className="rating">
      <span>{rows}</span>
      <span>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825"
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string
};

export default Rating;
