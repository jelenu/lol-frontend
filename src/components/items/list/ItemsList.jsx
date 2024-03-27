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

  /**
   * Function to fetch items data from the API.
   * Makes a GET request to fetch items, tags, and stats.
   * Checks if the response is successful.
   * If the response is successful, set items, tags, and stats states with the received data.
   * Log the received stats and data to the console.
   * If the response is not successful, log an error to the console.
   * Handles network errors if any.
   **/
  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/builds/items/all/", {
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
        console.log(stats);
        console.log(data);
      } else {
        console.error("Error getting items");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };


  /**
   * Effect hook to fetch items data when component mounts.
   */
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  /**
   * Handles tag selection.
   * If the tag is already selected, remove it from the selection.
   * If the tag is not selected, add it to the selection.
   * @param {string} tagId - The ID of the tag to be selected.
   */
  const handleTagSelection = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  /**
   * Filters items based on selected tags.
   * If no tags are selected, returns all items.
   * Otherwise, returns items that contain all selected tags.
   * @returns {Array} - Filtered items based on selected tags.
   */
  const filterItemsByTags = () => {
    if (selectedTags.length === 0) {
      return items;
    }
    return items.filter((item) =>
      selectedTags.every((tagId) => item.tags.includes(tagId))
    );
  };
  const filteredItems = filterItemsByTags();

  /**
   * Handles item hover event.
   * Sets the selected item ID.
   * @param {string} itemId - The ID of the item being hovered over.
   */
  const handleItemHover = (itemId) => {
    setSelectedItem(itemId);
  };

  /**
   * Handles item leave hover event.
   * Resets the selected item ID.
   */
  const handleItemLeave = () => {
    setSelectedItem(null);
  };

  /**
   * Sanitizes and renders HTML content.
   * Cleans the HTML string based on allowed tags and attributes.
   * @param {string} htmlString - The HTML string to be sanitized and rendered.
   * @returns {Object} - Object containing sanitized HTML content.
   */
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
    <div>
      {/* Main container */}
      <div className="container">
        {/* Container for tags */}
        <div className="tags-container">
          {/* Render tag buttons */}
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
        {/* Container for filtered items */}
        <div className="items-container">
          {/* Render filtered items */}
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="item"
              onMouseEnter={() => handleItemHover(item.id)}
              onMouseLeave={handleItemLeave}
            >
              {/* Render item image */}
              <img
                src={`http://localhost:8000/${item.image}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Item details on hover */}
      {selectedItem && (
        <div
          className="item-details"
          // Render item description safely
          dangerouslySetInnerHTML={sanitizeAndRenderHtml(
            // Find description of the item
            filteredItems.find((item) => item.id === selectedItem).description
          )}
        />
      )}
    </div>
  );
};
