import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function createSwagger(app: INestApplication): Promise<void> {
	const swaggerConfig = new DocumentBuilder()
		.setTitle("NestJS boilerplate")
		.setDescription("The NestJS API boilerplate description")
		.setVersion("1.0")
		.addTag("boilerplate")
		.build();

	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("docs", app, swaggerDocument);
}
