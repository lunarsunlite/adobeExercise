Changes: 
- In this exercise one of the test cases was in the past, for the year 2021, so commented out the "min" attribute so users can go "back in time". (Could also have picked another Oct 1 date for the test case.)
- Fun fact: Oct 1, 2027 lands on a Friday, so the cookies and the cheesecake are both discounted.
- Typically you wouldn't have a date picker on the UI that ties to when the sales would occur, but probably instead a date picker could be used for delivery date. 
- In a real case scenario, the store purchases should go by the timezone of where the store headquarters is located, assuming this is a single-store establishment.
- In a real case scenario, the data would probably be stored in a type of database, rather than a JSON file. I would set up a file that would perform the fetch calls. This would include try/catch handling if the UI could not reach the database. 
- Would like to update the UI to be cleaner, create reusable, stylized components for the buttons, rows, sections.