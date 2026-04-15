// import { PrismaClient } from '@prisma/client'
// import { PrismaNeon } from '@prisma/adapter-neon'
// import { neonConfig, Pool } from '@neondatabase/serverless'
// import ws from 'ws'

// // مطلوب في Node.js environment
// neonConfig.webSocketConstructor = ws

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined
// }

// function createPrismaClient() {
//   const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//   })

//   const adapter = new PrismaNeon(pool)

//   return new PrismaClient({ adapter })
// }

// export const prisma =
//   globalForPrisma.prisma ?? createPrismaClient()

// if (process.env.NODE_ENV !== 'production')
//   globalForPrisma.prisma = prisma