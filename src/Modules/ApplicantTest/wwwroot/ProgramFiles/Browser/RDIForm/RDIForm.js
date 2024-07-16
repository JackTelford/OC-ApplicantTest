import React from 'react';

const RDIForm = () => (
  <body>
  <form id="myForm">
    <label htmlFor="date">Date (MM/DD/YYYY):</label><br />
    <input type="text" id="date" name="date" /><br />
    <label htmlFor="textfield">Text Field:</label><br />
    <input type="text" id="textfield" name="textfield" /><br />
    <input type="submit" value="Submit" />
  </form>
  </body>
);

export default RDIForm;
