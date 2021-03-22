import React from 'react'
import { Accordion } from "@trussworks/react-uswds";
const Tables = ({sectionSelect,methodItems,supItems,matsTableFlag,systemsItems}) => {

    const sections = {
        "Monitoring Methods": (
          <div>
            <hr width="100%" align="center" />
            <Accordion
              bordered={false}
              items={methodItems}
              className="accordions"
            />
            <hr width="100%" align="center" />
            {matsTableFlag ? (
              <Accordion bordered={true} items={supItems} className="accordions" />
            ) : (
              ""
            )}
            <hr width="100%" align="center" />
          </div>
        ),
        "Monitoring Systems": (
          <div>
            <hr width="100%" align="center" />
            <Accordion
              bordered={false}
              items={systemsItems}
              className="accordions"
            />
            <hr width="100%" align="center" />

            <hr width="100%" align="center" />
          </div>
        ),
      };
    return (
        <div>
            {sections[sectionSelect]}
        </div>
    )
}

export default Tables
