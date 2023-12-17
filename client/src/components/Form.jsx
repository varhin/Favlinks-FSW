import React, { useState } from 'react';

function Form({ submitForm }) {
  // State to manage the form inputs
  const [linkName, setLinkName] = useState('');
  const [linkURL, setLinkURL] = useState('');

  // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'linkName') {
      setLinkName(value);
    } else if (name === 'linkURL') {
      setLinkURL(value);
    }
  };

  // Event handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call the submitForm prop with the form data
    submitForm({ name: linkName, url: linkURL });
    // Reset form inputs
    setLinkName('');
    setLinkURL('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="linkName">Link Name:</label>
      <input
        type="text"
        id="linkName"
        name="linkName"
        value={linkName}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <label htmlFor="linkURL">Link URL:</label>
      <input
        type="text"
        id="linkURL"
        name="linkURL"
        value={linkURL}
        onChange={handleInputChange}
      />
      <br />
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
