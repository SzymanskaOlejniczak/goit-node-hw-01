const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

// TODO: udokumentuj każdą funkcję
function listContacts() {
    fs.readFile(contactsPath, (error, data) => {
        if (error) throw error;
    
        const contacts = JSON.parse(data);
        console.table(contacts);
      });
  }
  
  function getContactById(contactId) {
    fs.readFile(contactsPath, (error, data) => {
        if (error) throw error;
    
        const contacts = JSON.parse(data);
        const foundContact = contacts.find(({ id }) => id === contactId);
        console.log(foundContact);
      });
  }
  function removeContact(contactId) {
    fs.readFile(contactsPath, (error, data) => {
        if (error) throw error;
    
        const contacts = JSON.parse(data);
        const filteredContacts = contacts.filter(({ id }) => id !== contactId);
    
        if (filteredContacts.length !== contacts.length) {
          fs.writeFile(contactsPath, JSON.stringify(filteredContacts), error => {
            if (error) throw error;
    
            console.log('contact deleted');
            listContacts();
          });
        } else {
          console.log(`not found id ${contactId}`);
          listContacts();
        }
      });
  }
  
  function addContact(name, email, phone) {
    fs.readFile(contactsPath, (error, data) => {
        if (error) throw error;
    
        const contacts = JSON.parse(data);
        const lastContactIndex = contacts.length - 1;
        const id = contacts[lastContactIndex].id + 1;
    
        contacts.push({ id, name, email, phone });
        fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
          if (error) throw error;
    
          console.log('Contact successfully added');
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
  
  function removeContact(contactId) {
    // ...twój kod
  }
  
  function addContact(name, email, phone) {
    // ...twój kod
  }