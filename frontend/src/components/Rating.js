import React from 'react'

const Rating = ({ value, text }) => {
    var floor = Math.floor(value);
    var max = 5;
    var ceil = Math.ceil(value);
    var difference = ceil - floor;
    var rows = [];

    for (var m = 0; m < floor; m++) {
        rows.push(<i class="fas fa-star"></i>);
    }

    if (difference > 0) {
        rows.push(<i class="fas fa-star-half-alt"></i>);
    }

    for (var n = 0; n < max - floor - difference; n++) {
        rows.push(<i class="far fa-star"></i>);
    }


    return (
        <div className='rating'>
            <span>
            {rows}
            </span>
        </div>
    )
}

export default Rating
