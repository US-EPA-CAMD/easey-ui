import React, { useState } from "react";
import { MegaMenu, NavDropDownButton, Link } from "@trussworks/react-uswds";

const Menu = (props) => {
  const subMenuCreation = (arrayTopics) => {
    let title = arrayTopics[0].title;
    let subMenu = arrayTopics
      .filter((val, ind) => ind != 0)
      .map((value, index) => {
        return (
          <Link href={value.link} target="_blank" key={index} title={title}>
            {value.name}
          </Link>
        );
      });
    return subMenu;
  };

  const menuCreation = () => {
    let mainMegaMenu = props.map((val, index) => {
      return subMenuCreation(val);
    });

    return mainMegaMenu;
  };
  const menu = menuCreation();

  const [open, setOpen] = useState(
    props.map(() => {
      return false;
    })
  );

  const menuToggle = (index, value) => {
    let newOpenMenu = [...open];
    newOpenMenu[index] = !value;
    setOpen(newOpenMenu);
  };

  const megaSideMenu = menu.map((subMenu, index) => {
    return (
      <>
        <NavDropDownButton
          onToggle={(): void => {
            menuToggle(index, open[index]);
          }}
          menuId={subMenu[index].props.title + "MenuDropDown"}
          isOpen={open[index]}
          label={subMenu[index].props.title}
          isCurrent={open[index]}
        />
        <MegaMenu
          key={index}
          items={[subMenu]}
          isOpen={open[index]}
          id={subMenu[index].props.title + "MenuDropDown"}
        />
      </>
    );
  });

  return megaSideMenu;
};

export default Menu;
