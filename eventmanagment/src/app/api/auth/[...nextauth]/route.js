import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handleLoin = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Event",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://192.168.29.208:8000/api/login/", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok && data) {
          return {
            id: data.user?.id || 1,
            name: data.user?.name || credentials.username,
            email: data.user?.email || "",
            token: data.access,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.accessToken;
      return session;
    },
  },
});

export { handleLoin as GET, handleLoin as POST };
