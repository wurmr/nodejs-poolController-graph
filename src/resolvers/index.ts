import got from 'got'

const poolControllerAddress =
  process.env.POOL_CONTROLLER_ADDRESS || 'http://localhost:4200'

// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    system: async () => {
      return await got.get(`${poolControllerAddress}/state/all`).json()
    },
  },
}

export default resolvers
