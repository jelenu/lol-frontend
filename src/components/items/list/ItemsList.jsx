import React, { useState, useEffect } from "react";
import "./itemsList.css";
/*npm install sanitize-html*/
import sanitizeHtml from "sanitize-html";

export const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [stats, setStats] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  /* API call Obtain items tags and stats */
  const fetchItems = async () => {
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
        console.log(data);
      } else {
        console.error("Error getting items");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* Select multiple Tags */
  const handleTagSelection = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  /* Return items filtered by selected Tags */
  const filterItemsByTags = () => {
    if (selectedTags.length === 0) {
      return items;
    }
    return items.filter((item) =>
      selectedTags.every((tagId) => item.tags.includes(tagId))
    );
  };
  const filteredItems = filterItemsByTags();

  /* Select item on hover */
  const handleItemHover = (itemId) => {
    setSelectedItem(itemId);
  };

  /* Deselect item on leave hover */
  const handleItemLeave = () => {
    setSelectedItem(null);
  };

  /* Transform plain text to html */
  const sanitizeAndRenderHtml = (htmlString) => {
    const cleanHtml = sanitizeHtml(htmlString, {
      allowedTags: ["mainText", "stats", "attention", "br"],
      allowedAttributes: {
        "*": ["class"],
      },
    });
    return { __html: cleanHtml };
  };

  return (
    <>
      <div className="container">
        <div className="tags-container">
          {/* TagButtons */}
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagSelection(tag.id)}
              className={selectedTags.includes(tag.id) ? "selected" : ""}
            >
              {tag.name}
            </button>
          ))}
        </div>
        <div className="items-container">
          {/* Filtered Items */}
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="item"
              onMouseEnter={() => handleItemHover(item.id)}
              onMouseLeave={handleItemLeave}
            >
              <img
                src={`http://localhost:8000/${item.image}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Hover item details */}
      {selectedItem && (
        <div
          className="item-details"
          dangerouslySetInnerHTML={sanitizeAndRenderHtml(
            filteredItems.find((item) => item.id === selectedItem).description
          )}
        />
      )}
    </>
  );
};
