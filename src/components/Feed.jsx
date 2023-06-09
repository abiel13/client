import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { MasonryLayout, Spinner } from "../components";
import { searchQuery, feedQuery } from "../utils/queries";

function Feed() {
  const [Loading, setLoading] = useState(false);
  const [Pins, setPins] = useState(null);
  const { catId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (catId) {
      const query = searchQuery(catId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [catId]);
  console.log(Pins);

  if (Loading) return <Spinner message="we are loading feed ideas" />;

  return (
    <div>
      {Pins?.length ? (
        <MasonryLayout pins={Pins} />
      ) : (
        <div className="font-medium text-xl">
          No Pins Found For This Category{" "}
          <p className="text-sm font-light">Suggestion:Create Pin For Category</p>
        </div>
      )}
    </div>
  );
}

export default Feed;
