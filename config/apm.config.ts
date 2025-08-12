import { ConfigService } from '@nestjs/config';
import apm from 'elastic-apm-node';

export const initializeApm = (configService: ConfigService) => {
  const isApmEnebled = configService.get<boolean>('APM_ENABLED', true);

  if (isApmEnebled) {
    apm.start({
      serviceName: configService.get<string>(
        'APM_SERVICE_NAME',
        'nest-practice',
      ),
      serverUrl: configService.get<string>(
        'APM_SERVER_URL',
        'http://localhost:8200',
      ),
      environment: configService.get<string>('NODE_ENV', 'development'),
      active: configService.get<boolean>('APM_ACTIVE', true),
      captureExceptions: configService.get<boolean>(
        'APM_CAPTURE_EXCEPTIONS',
        true,
      ),
      transactionSampleRate: configService.get<number>(
        'APM_TRANSACTION_SAMPLE_RATE',
        1.0,
      ),
      metricsInterval: configService.get<string>('APM_METRICS_INTERVAL', '30s'),
      logLevel: configService.get('APM_LOG_LEVEL', 'info'),
    });
  }
};
