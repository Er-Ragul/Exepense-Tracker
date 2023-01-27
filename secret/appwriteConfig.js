import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('http://192.168.0.213/v1')
    .setProject('63bea8aa05db4281b2b0');

export const account = new Account(client);
export const databases = new Databases(client);
export const apiUrl = "http://192.168.0.213:3000"