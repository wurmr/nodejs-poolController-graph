import { gql } from 'apollo-server'

const typeDefs = gql`
  # Simple Example API surface for the pump controller system
  type State {
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
    system: System!
  }

  type System {
    state: State!
    config: Config!
  }

  type Circuit {
    id: ID!
    showInFeatures: Boolean!
    isOn: Boolean!
    name: String
    type: CircuitType
    nameId: ID!
  }

  type CircuitType {
    val: ID!
    name: String
    desc: String
    isLight: Boolean
  }

  type Config {
    options(id: ID): [ConfigOption]!
    circuits: [Circuit]!
    lightingCircuits: [Circuit]!
  }

  type ConfigOption {
    id: ID!
    name: String
    description: String
  }

  type Mutation {
    startSuperChlorinate(id: ID!, superChlorinate: Boolean): System
    setSuperChlorHours(id: ID!, hours: Int!): System
  }
`

export default typeDefs
