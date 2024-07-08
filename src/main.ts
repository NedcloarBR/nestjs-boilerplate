import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
	const logger = new Logger("main");
	const configModule = app.get<ConfigService>(ConfigService);
	const PORT = configModule.getOrThrow<number>("PORT");

	app.useGlobalPipes(
		new ValidationPipe({
			always: true,
			forbidNonWhitelisted: true,
			whitelist: true,
			transform: true,
		}),
	);

	const swaggerConfig = new DocumentBuilder()
		.setTitle("NestJS template")
		.setDescription("The NestJS API template description")
		.setVersion("1.0")
		.addTag("template")
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("api", app, swaggerDocument);

	try {
		await app.listen(PORT, "0.0.0.0");
		logger.log(`Listening to PORT: ${PORT} | URL: ${await app.getUrl()}`);
	} catch (error) {
		logger.error(error);
	}
}

bootstrap();
