import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import connectMongo from '@/app/dbConnect/connectMongo'
import User from '@/app/models/User'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'select_account',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === 'google' && profile) {
        await connectMongo()
        let user = await User.findOne({ email: profile.email?.toLowerCase() })
        if (!user) {
          user = await User.create({
            name: profile.name || profile.email?.split('@')[0],
            email: profile.email?.toLowerCase(),
            userType: 'customer',
            provider: 'google',
            providerId: profile.sub,
            image: profile.picture ?? null,
          })
        }
        token.userId = user._id.toString()
        token.userType = user.userType
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId
        session.user.userType = token.userType
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
