// Import React
import React from 'react';

// TableHeader component
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

// TableBody component
const TableBody = (props) => {
  const rows = props.linkData.map((row, index) => (
    <tr key={index}>
      <td>{row.name}</td>
      <td>
        <a href={row.url}>{row.url}</a>
      </td>
      <td>
        <button onClick={() => props.removeLink(index)}>Delete</button>
      </td>
     
    </tr>
  ));

  return <tbody>{rows}</tbody>;
};

// Table component
function Table(props) {
  return (
    <table>
      <TableHeader />
      {/* Pass the necessary props to TableBody */}
      <TableBody linkData={props.linkData} removeLink={props.removeLink} updateLink={props.updateLink}/>
    </table>
  );
}

// Export Table component
export default Table;
