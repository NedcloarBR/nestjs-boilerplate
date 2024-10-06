import { Controller, Get } from "@nestjs/common";
import {
	HealthCheck,
	HealthCheckService,
	PrismaHealthIndicator,
} from "@nestjs/terminus";
import { PrismaService } from "nestjs-prisma";

@Controller("health")
export class HealthController {
	constructor(
		private readonly health: HealthCheckService,
		private readonly prismaHealth: PrismaHealthIndicator,
		private readonly prisma: PrismaService,
	) {}

	@Get()
	@HealthCheck()
	check() {
		return this.health.check([
			async () => this.prismaHealth.pingCheck("database", this.prisma),
			() => ({
				http: {
					status: "up",
					uptime: process.uptime(),
				},
			}),
		]);
	}
}
