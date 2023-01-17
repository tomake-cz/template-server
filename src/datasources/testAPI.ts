import { PrismaClient } from '@prisma/client'
import { DataSource } from 'apollo-datasource'

export class TestAPI extends DataSource {
  private context: any
  private readonly prisma: PrismaClient

  constructor({ prisma }: { prisma: PrismaClient }) {
    super()
    this.prisma = prisma
  }

  initialize(config: any) {
    this.context = config.context
  }

  async getAllTests() {
    const tests = await this.prisma.test.findMany()

    console.log('getAllTests', tests)
    return tests
  }
}
