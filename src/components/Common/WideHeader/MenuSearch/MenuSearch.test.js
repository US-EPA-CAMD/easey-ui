import React from "react";
import MenuSearch from "./MenuSearch";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("testing menu search bar ", () => {

  const menuSearchTest = () => {
    return (
      <MenuSearch />
    );
  };

//   test("table renders search function", () => {
//     const { container } = render(<menuSearchTest/>);
//     const searchBox = container.querySelectorAll("form .searchBox");
//     expect(searchBox.length).toEqual(1);
//   });

  test("should open a new window ", () => {
    const { container, getByLabelText, getByText } = render(<menuSearchTest />);
    const searchBox = container.getByTestId('input-search');
    fireEvent.change(searchBox, { target: { value: 'test' } });
    global.open = jest.fn();
    
    fireEvent.click(getByTestId('input-button-search'));
    expect(global.open).toBeCalled();
  });
});

