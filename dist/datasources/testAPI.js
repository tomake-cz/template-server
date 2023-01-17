import { DataSource } from 'apollo-datasource';
export class TestAPI extends DataSource {
    constructor({ prisma }) {
        super();
        this.prisma = prisma;
    }
    initialize(config) {
        this.context = config.context;
    }
    async getAllTests() {
        const tests = await this.prisma.test.findMany();
        console.log('getAllTests', tests);
        return tests;
    }
}
