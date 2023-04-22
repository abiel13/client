import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

function MasonryLayout({ pins }) {
  const breakpoint = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  return (
    <Masonry breakpointCols={breakpoint} className="flex gap-4 animate-slide-fwd">
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
}

export default MasonryLayout;
