const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

/*
 * Раскомментируй и запиши значение
 * const contactsPath = ;
 */
// TODO: задокументировать каждую функцию
const contactsPath = path.join(__dirname, "db", "contacts.json");
// console.log(contactsPath);

async function listContacts() {
  //   const dataStr = await fs.readFile(contactsPath, "utf-8").JSON.parse();
  //   return dataStr;
  const dataStr = await fs.readFile(contactsPath, "utf-8");
  const dataParse = JSON.parse(dataStr);
  return dataParse;
}

async function getContactById(id) {
  const allContacts = await listContacts();
  const productById = allContacts.find((product) => product.id === id);
  return productById ? productById : null;
}

async function removeContact(id) {
  const allContacts = await listContacts();
  const productById = allContacts.find((product) => product.id === id);

  if (productById) {
    const newArray = allContacts.filter((contacts) => {
      return contacts.id !== id;
    });
    await fs.writeFile(contactsPath, JSON.stringify(newArray));
    console.log(`Contacts whith id-${id} was deleted!`);
  }
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  if (
    allContacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    ) ||
    allContacts.find((contact) => contact.phone === phone)
  ) {
    return console.log("This name or number already exists");
  } else {
    const newProduct = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };

    allContacts.push(newProduct);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    console.log(`Contacts ${name} - ${phone} - ${email} was added!`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
