import got from 'got'
import { IResolvers } from 'apollo-server'

const prefixUrl = process.env.POOL_CONTROLLER_ADDRESS || 'http://localhost:4200'
const instance = got.extend({ prefixUrl })

const mockConfigOptions = [
  {
    id: '1',
    name: 'spa',
    descrption: 'spa',
  },
  {
    id: '2',
    name: 'pool',
    descrption: 'pool',
  },
]

// schema. This resolver retrieves books from the "books" array above.
const resolvers: IResolvers = {
  Query: {
    system: () => {
      return {
        state: async () => {
          return await instance.get('state/all').json()
        },
        // Return a default object
        // empty is fine if everything in it is handled by chained resolvers
        config: () => ({}),
      }
    },
  },
  Config: {
    options: (_, { id }: { id: String }) => {
      // If we are filtering by ID then filter our list
      if (id) {
        return mockConfigOptions.filter((config) => config.id === id)
      }
      // otherwise return the entire list
      else return mockConfigOptions
    },
  },
  Mutation: {
    startSuperChlorinate: async (_, args: { id: String }) => {
      // Do something interesting here to mutate the state, for now we call the rest api
      //* Example:
      //* state.chlorinators.superChlorinate(parseInt(args.id, 10), args.superChlorinate);
      await instance.put('state/chlorinator/superChlorinate', {
        json: { ...args },
      })
      // Return the entire state
      return await instance.get('state/all').json()
    },
    setSuperChlorHours: async (_, args: { id: String; hours: Number }) => {
      // Do something interesting here to mutate the state, for now we call the rest api
      //* Example:
      //* state.chlorinators.setSuperChlorHours(parseInt(args.id, 10), parseInt(args.hours, 10));
      await instance.put('state/chlorinator/superChlorHours', {
        json: { ...args },
      })
      // Return the entire state
      return await instance.get('state/all').json()
    },
  },
}

export default resolvers
