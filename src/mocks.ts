import casual from 'casual'

export default {
  Query: () => ({
    tests: () => [...new Array(casual.integer(2, 5))],
  }),
  Test: () => ({
    id: casual.integer(1, 10),
    name: casual.name,
    email: casual.email,
  }),
}
