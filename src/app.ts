import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../.env') });

import { feathers } from '@feathersjs/feathers';
import express, { rest, json, urlencoded, cors, notFound, errorHandler } from '@feathersjs/express';
import configuration from '@feathersjs/configuration';
import socketio from '@feathersjs/socketio';
import type { Application } from './declarations';
import { configurationValidator } from './configuration';
import { logError } from './hooks/log-error';
import { services } from './services/index';
import { channels } from './channels';
import { sequelize } from './sequelize.config';
import { meshErrorHandler } from './utils/error';
import { meshInterceptor } from './utils/interceptor';

const app: Application = express(feathers());

// Load app configuration
app.configure(configuration(configurationValidator));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Configure services and real-time functionality
app.configure(rest());
app.configure(
  socketio({
    cors: {
      origin: '*',
    },
  }),
);
app.configure(services);
app.configure(channels);

app.use(notFound());

app.use(meshInterceptor);
app.use(meshErrorHandler);

app.hooks({
  error: logError,
});

sequelize.sync();

export { app };
