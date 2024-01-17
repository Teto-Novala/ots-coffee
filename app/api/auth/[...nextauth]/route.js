import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { instance } from "@/app/axios/axiosConfig";

// export const handler = NextAuth({
//   secret: process.env.SECRET,
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username",
//           type: "text",
//           placeholder: "Username",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//       },
//       async authorize(credentials, req) {
//         try {
//           const res = await axios.post(
//             `${process.env.DATABASE_URL}/auth/signIn`,
//             {
//               username: credentials.username,
//               password: credentials.password,
//             },
//             {
//               headers: {
//                 Accept: "*/*",
//                 "Content-Type": "application/json",
//               },
//             }
//           );
//           return res.data;
//         } catch (error) {
//           console.log(error.response.data);
//           throw new Error(error.response.data.message);
//           // alert(error.res.data.message);
//           // return error.response.data;
//         }
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   debug: process.env.NODE_ENV === "development",
// });

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await instance.post(
            `/signIn`,
            {
              email: credentials.email,
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );
          console.log("res.data : ", res.data.user);

          // session itu isinya object yg property atua keynya user
          // user itu sebuah object yang keynya name, email dan image
          // aku pgn name ganti jadi username, dan ternyata.....

          // gk bisa di overwrite,
          return res.data.user;
        } catch (error) {
          throw new Error(error.response.data.message);
          // alert(error.res.data.message);
          // return error.response.data;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.username) {
        token.username = session?.username;
      }

      if (user) {
        return {
          ...token,
          id: user._id,
          username: user.username,
          email: user.email,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          username: token.username,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
