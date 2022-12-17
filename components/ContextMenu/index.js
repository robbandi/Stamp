import React, { useState, useEffect } from "react";

const ContextMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      setMenuPosition({ x: event.clientX, y: event.clientY });
      setMenuVisible(true);
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const saveImageButton = document.getElementById("save-image");
  saveImageButton.addEventListener("click", function() {
    // Get the URL of the image
    const imageUrl = "http://example.com/image.jpg";
  
    // Create a new anchor element
    const link = document.createElement("a");
  
    // Set the href and download attributes of the anchor element
    link.href = imageUrl;
    link.download = "image.jpg";
  
    // Trigger the download
    link.click();
  
    // Release the object URL once the image has finished downloading
    link.addEventListener("click", function() {
      setTimeout(function() {
        window.URL.revokeObjectURL(link.href);
      }, 100);
    });
  });

  return (
    <div
      id="context-menu"
      style={{
        position: "fixed",
        top: menuPosition.y,
        left: menuPosition.x,
        display: menuVisible ? "block" : "none",
      }}
    >
      <a id="save-image" href="#">Download</a>
    </div>
  );
};

export default ContextMenu;