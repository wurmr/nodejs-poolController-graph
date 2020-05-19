import { gql } from 'apollo-server'

const typeDefs = gql`
  # Simple Example API surface for the pump controller system

  type System {
    time: String
    valve: Int
    delay: Int
    adjustDST: Boolean
    batteryVoltage: Int
    status: Status
    mode: Mode
    freeze: Boolean
    appVersion: String
    pumps: [Pump]
  }

  type Status {
    val: Int
    name: String
    percent: Int
  }

  type Mode {
    val: Int
  }

  type Pump {
    minSpeed: Int
  }

  type Query {
    system: System
  }

  type Mutation {
    startSuperChlorinate(id: ID!, superChlorinate: Boolean): System
    setSuperChlorHours(id: ID!, hours: Int!): System
  }
`

export default typeDefs
