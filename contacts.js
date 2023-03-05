const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (error, contacts) => {
    if (error) throw error;

    console.table(JSON.parse(contacts));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, contacts) => {
    if (error) throw error;

    const foundContact = JSON.parse(contacts).find(
      ({ id }) => id === contactId
    );
    console.table(foundContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;

    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    if (filteredContacts.length !== contacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), (error) => {
        if (error) throw error;

        console.table("contact deleted");
        listContacts();
      });
    } else {
      console.table(`not found id ${contactId}`);
      listContacts();
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;

    const contacts = JSON.parse(data);
    const lastContactIndex = contacts.length - 1;
    const id = Number(contacts[lastContactIndex].id) + 1;

    contacts.push({ id: id.toString(), name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
      if (error) throw error;

      console.table("Contact successfully added");
      listContacts();
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
