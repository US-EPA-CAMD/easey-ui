import React, { useMemo } from "react";
import * as fs from "../../../utils/selectors/facilities";
import ContactsRender from "./ContactsRender";

const ContactsData = ({ facility }) => {
  const rolesSearch = ["Owner", "Operator"];
  const contacts = useMemo(() => {
    if (facility) {
      return fs.getContacts(facility);
    }
  }, [facility]);

  const contactsRoles = useMemo(() => {
    if (facility) {
      return rolesSearch.map((role) => fs.getContactsRoleUnits(role, facility));
    }
  }, [facility]);
  return <ContactsRender contactsRoles={contactsRoles} contacts={contacts} />;
};

export default ContactsData;
