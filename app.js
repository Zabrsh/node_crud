const { MongoClient } = require("mongodb");

const uri = require('./atlas_uri');
var ObjectId = require('mongodb').ObjectID;

console.log(uri);

const client = new MongoClient(uri);
const dbname = "bank";
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

// const sampleAccount = {
//  account_holder: "Linus Torvalds",
//  account_id: "MDB829001337",
//  account_type: "checking",
//  balance: 50352434,
// }

// Document used as a filter for the find() method
const documentsToFind = { balance: { $gt: 4700 } }
const sampleAccounts = [
    {
      account_id: "MDB011235813",
      account_holder: "Ada Lovelace",
      account_type: "checking",
      balance: 60218,
    },
    {
      account_id: "MDB829000001",
      account_holder: "Muhammad ibn Musa al-Khwarizmi",
      account_type: "savings",
      balance: 267914296,
    },
   ]
   // Document used as a filter for the findOne() method
   //const documentToFind = { _id: ObjectId("62a3638521a9ad028fdf77a3") };

   //Update documents
   const documentToUpdate = { _id: ObjectId("62d6e04ecab6d8e130497482") }
   const documentsToUpdate = { account_type: "checking" };

   const update = { $push: { transfers_complete: "TR413308000" } }
   const documentToDelete = { _id: ObjectId("62d6e04ecab6d8e13049749c") }
   const documentsToDelete = { balance: { $lt: 500 } }
//const update = { $inc: { balance: 100 } }

const connectToDatabase = async () => {
    try {
      await client.connect();
      console.log(`Connected to the ${dbname} database`);
      //const dbs = await client.db().admin().listDatabases()
      //console.table(dbs.databases)
      //Inserting single document
      // let result = await accountsCollection.insertOne(sampleAccount)
      // console.log(`Inserted document: ${result.insertedId}`)
      //INserting multiple documents
      // let result = await accountsCollection.insertMany(sampleAccounts)
      // console.log(`Inserted ${result.insertedCount} documents`)
      // console.log(result)

      //Searching for multiple documents
      //    let result = accountsCollection.find(documentsToFind)
      //    let docCount = accountsCollection.countDocuments(documentsToFind)
      //    await result.forEach((doc) => console.log(doc))
      //    console.log(`Found ${await docCount} documents`)

      //Searching one document
      // findOne() method is used here to find a the first document that matches the filter
//    let result = await accountsCollection.findOne(documentToFind)
//    console.log(`Found one document`)
//    console.log(result)

// //Update singleDocument
// let result = await accountsCollection.updateOne(documentToUpdate, update)
//     result.modifiedCount === 1
//       ? console.log("Updated one document")
//       : console.log("No documents updated")
//Update many docs
// let result = await accountsCollection.updateMany(documentsToUpdate, update)
//     result.modifiedCount > 0
//       ? console.log(`Updated ${result.modifiedCount} documents`)
//       : console.log("No documents updated")
//Deletionofdocument
let result = await accountsCollection.deleteOne(documentToDelete)
//let result = await accountsCollection.deleteMany(documentsToDelete)

    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`);
    }
}

const main = async () => {
    try {
        await connectToDatabase();
    } catch (err) {
        console.log(`Error connecting to the database: ${err}`);
    } finally {
        await client.close();
    }
}

main();

