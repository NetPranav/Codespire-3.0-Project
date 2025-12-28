// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { connect } from "@/DataBase/mongo.config";
// import { User } from "@/model/user";
// import GitHubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: AuthOptions = {
//   pages: {
//     signIn: "/login", // ".login"
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       try {
//         await connect();

//         const findUser = await User.findOne({ email: user.email });
//         if (findUser) {
//           return true;
//         }
//         await User.create({
//           name: user.name,
//           email: user.email,

//         })
//         return true;
//       } catch (err) {
//         console.log("Error in signIn callback:", err);
//         return false;
//       }
//     },
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Next Auth",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter Your Email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials, req) {
//         await connect();
//         const user = await User.findOne({ email: credentials?.email });
//         // const user = await User.findOne({email:credentials?:email})

//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     })
//   ],
// };




import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connect } from "@/DataBase/mongo.config";
import { User } from "@/model/user";

export const authOptions: AuthOptions = {
  // pages: {
  //   signIn: "/login",
  // },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();

        if (!credentials?.email) return null;

        const user = await User.findOne({ email: credentials.email });
        return user || null;
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        await connect();

        if (!user?.email) return false;

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            provider: account?.provider,
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
  },
};
