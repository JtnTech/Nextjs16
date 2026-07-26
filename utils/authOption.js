import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // Runs after successful Google authentication
    async signIn({ profile }) {
      try {
        console.log("Profile:", profile);

        // Connect MongoDB
        await connectDB();

        // Check if user exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // Create image URL
        const image = profile.picture
          ? profile.picture
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.name,
            )}&background=2563eb&color=fff`;

        if (!userExists) {
          const username = profile.name.slice(0, 20);

          await User.create({
            email: profile.email,
            username,
            image,
          });
        } else {
          // Update image if user already exists
          userExists.image = image;
          await userExists.save();
        }

        return true;
      } catch (error) {
        console.log("Sign In Error:", error);
        return false;
      }
    },

    // Modify Session
    async session({ session }) {
      await connectDB();

      const user = await User.findOne({
        email: session.user.email,
      });

      if (user) {
        session.user.id = user._id.toString();
        session.user.image = user.image;
        session.user.username = user.username;
      }

      return session;
    },
  },
};
