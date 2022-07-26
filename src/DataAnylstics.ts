"use strict";
import { Users, dummies } from "@foxtail-dev/datacontracts";
import { Db, MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017");
const u: Users.User = dummies.createUser();

const addDocument = async (document: any, category: string) => {
  await client.connect().then((_) => console.log("Connected to db"));
  const db = client.db(u._id);
  const collection = db.collection(category);
  const result = await collection.insertOne(document);
  return result;
};

const addDocuments = (documents: Array<any>, category: string) => {
  for (let i = 0; i < documents.length; i++) {
    if (addDocument(documents[i], category) === undefined) {
      console.log(`Document ${i} failed to be added`);
    } else {
      console.log(`Document ${i} was added sucessfully`);
    }
  }
};

/*
Questions to ask:
1) Is this the correct way to write the functions
2) is there a way to have deeper sectioning (IE a collection within a collection)
3) 
*/
