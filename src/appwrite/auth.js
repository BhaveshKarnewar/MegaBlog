import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client =
    new Client(); /*if setEndpoint done here then it will get created by default & it is waste of resources*/
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call a function
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      //create email session
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    //TO check if you are logged in or not
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser Error :", error);
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Logout Error :", error);
    }
  }
}

const authService = new AuthService();

export default authService;
