import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/Mongodb/Adapter";

import CredentialsProvider from "next-auth/providers/credentials";
import Users from "../../../Models/UserSchema";
import { compare } from "bcryptjs";

import connectDB from "../../../db/connect";

export const authOptions = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        // console.log(credentials, "credentials");// data passed by user
        connectDB().catch((error) => {
          error: "Connection Failed...!";
        });

        // check user existance
        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }
        // console.log(result, "result");
        // compare()
        const checkPassword = await compare(
          credentials.password,
          result.password
        );
        // console.log(checkPassword, "check_password");

        // incorrect password`
        if (!checkPassword || result.email !== credentials.email) {
          console.log("not working, Username or Password doesn't match");
          throw new Error("You entered wrong password");
          return null;
        }

        console.log("working collecting user model", result);
        return {
          ...result,
          email: result.email,
          image: result.image,
          name: result.name,
          _id: result._id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      try {
        // Send properties to the client, like an access_token and user id from a provider.
        console.log(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
        const result = await Users.findOne({ email: session.user.email });
        // console.log("session", session, "result", result);
        if (result) {
          // console.log("session", session, "result", result);
        }
        // session.accessToken = token.accessToken;
        // session.user.id = token.id;
        session.user._id = result._id;
        // console.log("session", session, "token", token);

        return session;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
