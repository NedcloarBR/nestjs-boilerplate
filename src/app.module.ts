import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { OpenTelemetryModule } from "nestjs-otel";
import { PrismaModule } from "nestjs-prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./modules/health/health.module";

@Module({
	imports: [
		PrismaModule.forRoot({
			isGlobal: true,
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		OpenTelemetryModule.forRoot({
			metrics: {
				hostMetrics: true,
				apiMetrics: {
					enable: true,
				},
			},
		}),
		HealthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
