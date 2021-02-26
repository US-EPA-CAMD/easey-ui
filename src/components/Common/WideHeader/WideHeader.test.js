// import React from "react";
// import { configure, shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
// import WideHeader from "./WideHeader";

// configure({ adapter: new Adapter() });

// describe("<WideHeader/>", () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = shallow(<WideHeader />);
//   });

//   it("government banner at top ", () => {
//     expect(wrapper.find('div.block-pane-official-website-header')).toHaveLength(1);
//   });
//   it("sandbox banner  ", () => {
//     expect(wrapper.find('div#topbanner')).toHaveLength(1);
//   });
//   it('one menu button ' , () => {
//       expect(wrapper.find('.menuBTN')).toHaveLength(1);
//   });
//   it("nav bar ", () => {
//     expect(wrapper.find('div.usa-nav-container')).toHaveLength(1);
//   });
// });

import React from "react";
import WideHeader from "./WideHeader";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
describe("testing search/filter feature of generic uswds table component", () => {


  const WideHeaderTest = () => {
    return (
      <WideHeader/>
    );
  };

  test("navbar renders a menu button", () => {
    const { container } = render(<WideHeaderTest/>);
    const menuBTN = container.querySelectorAll(".menuBTN");
    expect(menuBTN.length).toEqual(1);
  });

  test("screen renders the close button when menu button is pressed", () => {
    const { container, getByLabelText, getByText,getByAltText } = render(<WideHeaderTest/>);
    // const searchBox = getByLabelText(/Filter by keyword:/i);
    // fireEvent.change(searchBox, { target: { value: 'World' } });
    fireEvent.click(getByText('Menu'));
    // const tableRecords = container.querySelectorAll("tbody tr");
    // expect(tableRecords.length).toEqual(1);
    expect(screen.getByAltText("close")).toBeDefined();
  });

});