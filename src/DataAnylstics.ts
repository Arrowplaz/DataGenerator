/*
Add document to collection DONE
Add many documents to collection DONE

Query documents by a single / many fields DONE
Query documents by item in array

Update a document
Update an item in an array that is within a document using $push
*/
"use strict";
import { Users, dummies } from "@foxtail-dev/datacontracts";
import { Db, MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017");
const u: Users.User = dummies.createUser();

const addDocument = async (document: any, category: string) => {
  try {
    await client.connect().then((_) => console.log("Connected to db"));
    const db = client.db(u._id);
    const collection = db.collection(category);
    const result = await collection.insertOne(document);
    console.log(`Inserted a document with the id of ${result.insertedId}`);
  } finally {
    await client.close();
  }
};

const addDocuments = async (
  documents: Array<any>,
  category: string,
  orderNeeded: boolean
) => {
  try {
    await client.connect().then((_) => console.log("Connected to db"));
    const db = client.db(u._id);
    const collection = db.collection(category);
    const result = await collection.insertMany(documents, {
      ordered: orderNeeded,
    });
    console.log(
      `${result.insertedCount} documents were entered with the Ids:${result.insertedIds} `
    );
  } finally {
    await client.close();
  }
};

const searcher = async (searchingFor: Array<any>, category: string) => {
  try {
    await client.connect().then((_) => console.log("Connected to db"));
    const db = client.db(u._id);
    const collection = db.collection(category);
    const cursor = collection.find({ $or: searchingFor });
    if (cursor.toArray.length === 0) {
      console.warn("No documents were found");
    } else {
      await cursor.forEach(console.dir);
    }
  } finally {
    await client.close();
  }
};

const updateDocument = async (
  document: any,
  category: string,
  addIfNew: boolean
) => {
  try {
    await client.connect().then((_) => console.log("Connected to db"));
    const db = client.db(u._id);
    const collection = db.collection(category);
    const result = collection.updateOne(document, { upsert: addIfNew });
    if ((await result).upsertedId !== undefined) {
      console.log(
        `0 matching documents found. Inserted 1 document with ID ${
          (await result).upsertedId
        }`
      );
    } else {
      console.log(`${(await result).matchedCount} documents were updated.`);
    }
  } finally {
    await client.close();
  }
};
/*
Questions to ask:
1) Clarification on tasks 6 & 9
2) Are the parameters I'm using for db and collection alright
3) How does using user.user fit in to all of this
*/
