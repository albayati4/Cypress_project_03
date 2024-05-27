![Image](https://www.cypress.io/cypress_logo_social.png)

## Date: 5/28/2024

### By: Abdullah Albayati

### Testing Front end project-03

#### Validating 5 test cases for all the components of a Book your trip form.

#### Creator Linkedin page

[Abdullah Albayati](https://www.linkedin.com/in/albayati-abdullah/)

---

#### This project was creatated and executed with the use of JaveScript, Node.js, Cypress, CSS selectors and POM.

---

### _Getting Started_

- In all test cases we are required to visit this page [project-3](https://www.techglobal-training.com/frontend/project-3)
- So I used `beforeEach` from Mocha framework with `cy.visit()` to handel visiting this website before each test case.
- I Created a separate folder called Pages with a BookYourTrip.js file inside to be able to use POM (Page Object Model)
- In my BookYourTrip.js I created a class called BookYourTrip and I added all my locators and methods then I exported this class with
  ```JavaScript
  export default BookYourTrip
  ```
- In order to use this page I had to imported in my 03-project.cy.js and create a new instance of this object to use it.
  ```JavaScript
  import BookYourTrip from "../pages/BookYourTrip";
  const bookYourTrip = new BookYourTrip();
  ```
- I used Date Object to get some dates to enter in the from.
  ```JavaScript
  const date = new Date();
  ```
- I created a method inside my page to get a new date with 3 arguments (month, day, year) and return it with interpolation in a proper way to use in date object

  ```JavaScript
    getNewDate(month, day, year) {
    return `${year}-${month}-${day}`;
  }
  ```

- I used each to handel validating multiple detalis with their text from an array

  ```JavaScript
    bookYourTrip.getFlightDetails().each(($el, index) => {
      const arr = ["Number of Passengers: 2", "Passenger 1: Adult (16-64)", "Passenger 2: Child (2-11)", "Cabin class: Premium Economy"];
      cy.wrap($el).should("have.text", arr[index]);
    });
  ```

- I used `bookYourTrip.getBookButton().should("not.be.disabled")` to check if a button is clickable.

- I used `bookYourTrip.getExpectedLocator.type('expected input') `to type anything in the input fields.

### _Screenshots_

![Image](https://i.ibb.co/TcnvGYd/Screenshot-2024-05-27-at-3-15-45-PM.png)
