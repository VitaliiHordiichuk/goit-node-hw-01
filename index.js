const operations = require("./contacts");
// console.log(operations);
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const data = await operations.listContacts();
        console.log("getAll", data);
        break;

      case "get":
        const product = await operations.getContactById(id);
        console.log("getById", product);
        break;

      case "add":
        await operations.addContact(name, email, phone);
        break;

      case "remove":
        await operations.removeContact(id);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log("Error:" + error.message);
  }
}
invokeAction(argv);

// invokeAction({
//   action: "add",
//   id: "22",
//   name: "Tomas",
//   email: "tomas@mail.com",
//   phone: "987656",
// });
