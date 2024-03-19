import React, { useState, useEffect } from "react";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [stats, setStats] = useState([]);

  const fetchBoards = async () => {
    try {
      const response = await fetch("http://localhost:8000/items/all/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data.items);
        setTags(data.tags);
        setStats(data.stats);
        console.log(data)

      } else {
        console.error("Error getting items");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);
  return(
    <div>{}</div>
  ) ;
};
