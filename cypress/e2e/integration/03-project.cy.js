/// <reference types="cypress"/>
import BookYourTrip from "../pages/BookYourTrip";
const bookYourTrip = new BookYourTrip();
const date = new Date();

describe("Cypress Project 03 - submission and date-picking processes", () => {
  beforeEach(() => {
    cy.visit("https://techglobal-training.com/frontend/project-3");
  });
  it("Test Case 01 - Validate the default Book your trip form", () => {
    bookYourTrip.getOneWayRadio().should("be.visible").and("be.checked");
    bookYourTrip.getRoundTripRaido().should("be.visible").and("not.be.checked");
    bookYourTrip.getFirstThreeDropDowns().then((firstThreeDropDowns) => {
      cy.wrap(firstThreeDropDowns).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    bookYourTrip.getDepartAndReturnDate().then((departAndReturnDate) => {
      cy.wrap(departAndReturnDate).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    bookYourTrip.getNumOfPassangers().should("be.visible").and("have.value", 1);
    bookYourTrip.getFirstPassanger().should("be.visible").and("have.value", "Adult (16-64)");
    bookYourTrip.getBookButton().should("be.visible").and("not.be.disabled");
  });

  it("Test Case 02 - Validate the Book your trip form when Round trip is selected", () => {
    bookYourTrip.getRoundTripRaido().realClick().should("be.checked");
    bookYourTrip.getOneWayRadio().should("not.be.checked");
    bookYourTrip.getFirstThreeDropDowns().then((firstThreeDropDowns) => {
      cy.wrap(firstThreeDropDowns).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    bookYourTrip.getDepartAndReturnDate().then((departAndReturnDate) => {
      cy.wrap(departAndReturnDate).each(($el) => {
        cy.wrap($el).should("be.visible");
      });
    });
    bookYourTrip.getNumOfPassangers().should("be.visible").and("have.value", 1);
    bookYourTrip.getFirstPassanger().should("be.visible").and("have.value", "Adult (16-64)");
    bookYourTrip.getBookButton().should("be.visible").and("not.be.disabled");
  });

  it("Test Case 03 - Validate the booking for 1 passenger and one way", () => {
    bookYourTrip.getOneWayRadio().check();
    bookYourTrip.getCabinClass().realClick().select("Business");
    bookYourTrip.getFromDropDown().realClick().select("Illinois");
    bookYourTrip.getToDropDown().realClick().select("Florida");
    bookYourTrip.getFromDate().realClick().clear().type(bookYourTrip.getNewDate("06", "04", "2024"));
    bookYourTrip.getNumOfPassangers().should("be.visible").and("have.value", 1);
    bookYourTrip.getFirstPassanger().realClick().select("Senior (65+)");
    bookYourTrip.getBookButton().realClick();
    bookYourTrip.getDepart().should("have.text", "DEPART");
    bookYourTrip.getDestination().should("have.text", "IL to FL");
    bookYourTrip.getFlightDetails().each(($el, index) => {
      const arr = ["Number of Passengers: 1", "Passenger 1: Senior (65+)", "Cabin class: Business"];
      cy.wrap($el).should("have.text", arr[index]);
    });
  });

  it("Test Case 04 - Validate the booking for 1 passenger and round trip", () => {
    bookYourTrip.getRoundTripRaido().check();
    bookYourTrip.getCabinClass().select("First");
    bookYourTrip.getFromDropDown().select("California");
    bookYourTrip.getToDropDown().select("Illinois");
    bookYourTrip.getFromDate().realClick().clear().type(bookYourTrip.getNewDate("06", "04", "2024"));
    bookYourTrip.getReturnDate().realClick().clear().type(bookYourTrip.getNewDate("07", "04", "2024"));
    bookYourTrip.getBookButton().realClick();
    bookYourTrip.getDepart().should("be.visible");
    bookYourTrip.getDestination().should("have.text", "CA to ILIL to CA");
    bookYourTrip.getFlightDetails().each(($el, index) => {
      const arr = ["Number of Passengers: 1", "Passenger 1: Adult (16-64)", "Cabin class: First"];
      cy.wrap($el).should("have.text", arr[index]);
    });
  });

  it("Test Case 05 - Validate the booking for 2 passengers and one way", () => {
    bookYourTrip.getOneWayRadio().check();
    bookYourTrip.getCabinClass().select("Premium Economy");
    bookYourTrip.getFromDropDown().select("New York");
    bookYourTrip.getToDropDown().select("Texas");
    bookYourTrip.getFromDate().clear().type(bookYourTrip.getNewDate("06", "28", "2024"));
    bookYourTrip.getNumOfPassangers().select(1, { force: true });
    bookYourTrip.getFirstPassanger().select("Adult (16-64)");
    bookYourTrip.getSecondPassanger().select("Child (2-11)");
    bookYourTrip.getBookButton().realClick();
    bookYourTrip.getDepart().should("have.text", "DEPART");
    bookYourTrip.getDestination().should("have.text", "NY to TX");
    bookYourTrip.getFlightDetails().each(($el, index) => {
      const arr = ["Number of Passengers: 2", "Passenger 1: Adult (16-64)", "Passenger 2: Child (2-11)", "Cabin class: Premium Economy"];
      cy.wrap($el).should("have.text", arr[index]);
    });
  });
});
