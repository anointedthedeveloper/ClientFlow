"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DealsService = class DealsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(orgId) {
        return this.prisma.deal.findMany({
            where: { organizationId: orgId },
            include: { customer: true, assignedTo: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, orgId) {
        const deal = await this.prisma.deal.findFirst({
            where: { id, organizationId: orgId },
            include: {
                customer: true,
                assignedTo: { select: { id: true, name: true, email: true } },
                activities: { include: { user: { select: { id: true, name: true } } }, orderBy: { createdAt: 'desc' } },
            },
        });
        if (!deal)
            throw new common_1.NotFoundException('Deal not found');
        return deal;
    }
    create(dto, orgId) {
        return this.prisma.deal.create({
            data: { ...dto, organizationId: orgId },
            include: { customer: true },
        });
    }
    async update(id, dto, orgId) {
        await this.findOne(id, orgId);
        return this.prisma.deal.update({
            where: { id },
            data: dto,
            include: { customer: true, assignedTo: { select: { id: true, name: true, email: true } } },
        });
    }
    async remove(id, orgId) {
        await this.findOne(id, orgId);
        return this.prisma.deal.delete({ where: { id } });
    }
    async getDashboard(orgId) {
        const [totalCustomers, deals] = await Promise.all([
            this.prisma.customer.count({ where: { organizationId: orgId } }),
            this.prisma.deal.findMany({ where: { organizationId: orgId } }),
        ]);
        const totalDeals = deals.length;
        const totalRevenue = deals.filter(d => d.stage === 'CLOSED').reduce((sum, d) => sum + d.value, 0);
        const byStage = { LEAD: 0, CONTACTED: 0, PROPOSAL: 0, CLOSED: 0 };
        deals.forEach(d => byStage[d.stage]++);
        return { totalCustomers, totalDeals, totalRevenue, byStage };
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealsService);
//# sourceMappingURL=deals.service.js.map