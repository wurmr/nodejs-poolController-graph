import got from 'got'
import { IResolvers } from 'apollo-server'
import { mockConfigOptions, mockCircuits, mockCircuitTypes } from '../mockData'

const prefixUrl = process.env.POOL_CONTROLLER_ADDRESS || 'http://localhost:4200'
const instance = got.extend({ prefixUrl })

const getState = async () => {
  return await instance.get('state/all').json()
}

// schema. This resolver retrieves books from the "books" array above.
const resolvers: IResolvers = {
  Query: {
    system: () => {
      return {
        state: async () => {
          return await getState()
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
    circuits: () => mockCircuits,
    lightingCircuits: () => {
      // An example that only return circuits that have a type with isLight
      // *This could also be a filter on the above circuits reducer
      const lightCircuitTypes = mockCircuitTypes.filter((ct) => ct.isLight)
      return mockCircuits.filter((c) =>
        lightCircuitTypes.find((ct) => ct.val === c.type)
      )
    },
  },
  Circuit: {
    // Circuit resolvers, to resolve data that isn't nativily on the config
    type: (_) => {
      // use the parent chained call _ to figure dig into our child collection.
      // here the circuit has the foriegn key reference of .type and we find the ct with val
      return mockCircuitTypes.find((ct) => ct.val === _.type)
    },
    isOn: () => {
      // Example of digging the isOn status out of some other source
      // perhaps it doesn't exist in state or needs to be mapped differently
      return Math.random() >= 0.5
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
      return await getState()
    },
    setSuperChlorHours: async (_, args: { id: String; hours: Number }) => {
      // Do something interesting here to mutate the state, for now we call the rest api
      //* Example:
      //* state.chlorinators.setSuperChlorHours(parseInt(args.id, 10), parseInt(args.hours, 10));
      await instance.put('state/chlorinator/superChlorHours', {
        json: { ...args },
      })
      // Return the entire state
      return await getState()
    },
  },
}

export default resolvers
