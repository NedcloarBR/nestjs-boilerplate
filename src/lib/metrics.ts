import { Logger } from "@nestjs/common";
import { metrics } from "@opentelemetry/api";
import {
	getNodeAutoInstrumentations,
	getResourceDetectors,
} from "@opentelemetry/auto-instrumentations-node";
import { AsyncLocalStorageContextManager } from "@opentelemetry/context-async-hooks";
import {
	CompositePropagator,
	W3CBaggagePropagator,
	W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { B3InjectEncoding, B3Propagator } from "@opentelemetry/propagator-b3";
import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import {
	ATTR_SERVICE_NAME,
	ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { setupNodeMetrics } from "@sesamecare-oss/opentelemetry-node-metrics";

const logger = new Logger("OpenTelemetry");

const metricReader = new PrometheusExporter(
	{
		port: 8081,
	},
	() => {
		logger.log("Listening to PORT: 8081");
	},
);

const resource = new Resource({
	[ATTR_SERVICE_NAME]: "nestjs-boilerplate",
	[ATTR_SERVICE_VERSION]: "0.0.1",
});

const traceExporter = new OTLPTraceExporter({
	url: "http://otel-collector:4318/v1/traces",
});

const spanProcessor = new BatchSpanProcessor(traceExporter);

export const otelSDK = new NodeSDK({
	resource,
	metricReader,
	spanProcessor: spanProcessor,
	contextManager: new AsyncLocalStorageContextManager(),
	resourceDetectors: getResourceDetectors(),
	instrumentations: [getNodeAutoInstrumentations()],
	textMapPropagator: new CompositePropagator({
		propagators: [
			new W3CTraceContextPropagator(),
			new W3CBaggagePropagator(),
			new B3Propagator(),
			new B3Propagator({
				injectEncoding: B3InjectEncoding.MULTI_HEADER,
			}),
		],
	}),
});

setImmediate(() => {
	const meterProvider = metrics.getMeterProvider();
	const meter = meterProvider.getMeter("node-metrics");
	setupNodeMetrics(meter, {
		labels: resource.attributes as unknown as Record<string, string>,
	});
});

process.on("SIGTERM", () => {
	otelSDK
		.shutdown()
		.then(
			() => logger.verbose("SDK shut down successfully"),
			(err) => logger.error("Error shutting down SDK", err),
		)
		.finally(() => process.exit(0));
});
