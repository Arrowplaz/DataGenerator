import { Users, dummies } from '@foxtail-dev/datacontracts'
import { Db, MongoClient, ObjectId } from 'mongodb'

type Book = {
    pages : number,
    publishDate : number,
    author : string
}

type FictionBook = Book & { fantasyStyle : string }

const createBook = () : Book => ({
    author : 'aaron',
    pages : 1000,
    publishDate : Date.now()
})


const createFantasyBook = () : FictionBook => ({
    author : 'aaron',
    pages : 1000,
    publishDate : Date.now(),
    fantasyStyle : 'folk'
})

const run = async() => {
    const client = new MongoClient("mongodb://localhost:27017")
    await client.connect().then( _ => console.log("Connected to db"))
    
    const u : Users.User = dummies.createUser();
    
    const db = client.db('books');

    const collection = db.collection<FictionBook>('fiction')

    // const result = await collection.insertOne(createFantasyBook())
    // console.log(result)


    const foundBook = await collection.findOne({ _id : new ObjectId("62db41626ca63776d5cb6c22")  })

    console.log(foundBook)
}




run();