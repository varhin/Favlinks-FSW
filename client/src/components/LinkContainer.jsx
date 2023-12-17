import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Table from "./Table";
import Form from "./Form";


function LinkContainer() {
  // State to hold the favorite links
  const [favLinks, setFavLinks] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/links", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setFavLinks(result);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // Remove link logic
  const handleRemove = (index) => {
    const link = favLinks[index];
    fetch("http://localhost:4000/api/links/"+link.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    const updatedLinks = [...favLinks];
    updatedLinks.splice(index, 1);
    setFavLinks(updatedLinks);
  };

  const handleUpdate = (index) => {
    const link = favLinks[index];
    console.log(link); 
  };

  // Add new link logic
  const handleSubmit = (favLink) => {
    fetch("http://localhost:4000/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favLink),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setFavLinks([...favLinks, favLink]);
  };

  return (
    <div>
      <h1>My Favorite Links</h1>
      <p>Add a new link with a name and URL to the table! </p>
      {/* Pass the favLinks state and handleRemove function to the Table component */}
      <Table linkData={favLinks} removeLink={handleRemove} updateLink={handleUpdate} />
      <h1>Add New</h1>
      {/* Pass the handleSubmit function to the Form component */}
      <Form submitForm={handleSubmit} />
      <br/>
      <br/>
    </div>
  );
}

export default LinkContainer;
