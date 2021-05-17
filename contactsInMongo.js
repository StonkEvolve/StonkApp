const { ObjectId } = require('mongodb');
const db = require("./db")

async function getContactsCollection() {
    return db.getCollection("contacts")
}

async function createContact(firstName, lastName, phoneNumber) {
    let contactToCreate = {
        firstName,
        lastName,
        phoneNumber
    }
    let contactsCollection = await getContactsCollection()
    let insertResult = await contactsCollection.insertOne(contactToCreate)
    return insertResult.ops[0]._id
}

async function listContacts() {
    let contactsCollection = await getContactsCollection()
    let cursor = contactsCollection.find({})
    return cursor.toArray()
}

async function searchByNameFragment(nameFragment) {
    let matchNameFragment = new RegExp(`.*${nameFragment}.*`, 'i')
    const collection = await getContactsCollection()
    let cursor = collection.find({ "firstName": matchNameFragment })
    const response = await cursor.toArray()
    return response
} 
  
async function deleteContact(contactId) {
    const collection = await getContactsCollection()
    return collection.deleteOne({_id: ObjectId(contactId)})
}

module.exports = {
    createContact,
    listContacts,
    searchByNameFragment,
    deleteContact
}