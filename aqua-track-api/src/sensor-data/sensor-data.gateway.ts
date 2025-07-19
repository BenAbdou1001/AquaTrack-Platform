/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Alert } from 'src/alerts/entities/alert.entity';

@WebSocketGateway()
export class SensorDataGateway {
  @WebSocketServer()
  server: Server;

  broadcastSensorData(data: any) {
    this.server.emit('sensorData', data);
  }

  broadcastAlert(alert: Alert) {
    this.server.emit('alert', alert);
  }

  @SubscribeMessage('startMonitoring')
  handleStartMonitoring() {
    // This could trigger the service to start if needed
    return { message: 'Monitoring start requested' };
  }

  @SubscribeMessage('stopMonitoring')
  handleStopMonitoring() {
    // This could trigger the service to stop if needed
    return { message: 'Monitoring stop requested' };
  }
}
