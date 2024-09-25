import { listContacts, getContactById, deleteContact, addContact } from "./contacts.js";
import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
   
        const contacts = await listContacts();
        console.table(contacts);
        break;
  
      case "get":
        const contactDetails = await getContactById(id);
        console.log(contactDetails);
        break;
  
      case "add":
        try {
          const addNew = await addContact(name, email, phone);
          console.log("Successfully added to contact list: ", addNew);
        } catch (error) {
          console.log(error);
        }
        break;
  
      case "remove":
        try {
          const deleteCon = await deleteContact(id);
          console.log("Deleted from the contact list: ", deleteCon);
        } catch (error) {
          console.log(error);
        }
  
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  };
invokeAction(argv);