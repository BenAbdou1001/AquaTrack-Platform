/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tank } from 'src/tanks/entities/tank.entity';
import { Sensor } from 'src/sensors/entities/sensor.entity';
import { SensorData } from 'src/sensor-data/entities/sensor-datum.entity';
import { SensorDataGateway } from './sensor-data.gateway';
import { WebSocket } from 'ws'; // Import WebSocket from ws library

@Injectable()
export class SensorDataService {
  private readonly logger = new Logger(SensorDataService.name);
  private readonly fastApiWsUrl = process.env.FASTAPI_WS_URL; // Adjust URL as needed
  private ws: WebSocket | null = null;
  private monitoringEnabled = false;


  constructor(
    @InjectRepository(Tank)
    private tankRepository: Repository<Tank>,
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
    @InjectRepository(SensorData)
    private sensorDataRepository: Repository<SensorData>,
    private gateway: SensorDataGateway,
  ) {}

  // Start polling the FastAPI server every 5 seconds (adjust interval as needed)
  startMonitoring() {
    if (!this.monitoringEnabled) {
      this.monitoringEnabled = true;
      this.connectWebSocket();
      this.logger.log('Monitoring started via WebSocket');
    }
  }

  stopMonitoring() {
    if (this.monitoringEnabled) {
      this.monitoringEnabled = false;
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
      this.logger.log('Monitoring stopped via WebSocket');
    }
  }

  private connectWebSocket() {
    if (this.ws) return;

    this.ws = new WebSocket(this.fastApiWsUrl);

    this.ws.on('open', () => {
      this.logger.log('Connected to FastAPI WebSocket');
    });

    this.ws.on('message', async (data: string) => {
      const sensorData = JSON.parse(data);
      await this.processSensorData(sensorData);
    });

    this.ws.on('error', (error) => {
      this.logger.error('WebSocket error:', error.message);
    });

    this.ws.on('close', () => {
      this.ws = null;
      this.logger.log('WebSocket connection closed');
      if (this.monitoringEnabled) {
        setTimeout(() => this.connectWebSocket(), 5000); // Reconnect after 5 seconds
      }
    });
  }

  async processSensorData(sensorData: any) {
    for (const tankName in sensorData) {
      const tankData = sensorData[tankName];

      let tank = await this.tankRepository.findOne({ where: { name: tankName } });
      if (!tank) {
        tank = this.tankRepository.create({ name: tankName });
        await this.tankRepository.save(tank);
        this.logger.log(`Created new tank: ${tankName}`);
      }

      const timestamp = new Date(tankData.timestamp);

      for (const kpi in tankData) {
        if (kpi === 'timestamp') continue;

        const value = tankData[kpi];

        let sensor = await this.sensorRepository.findOne({
          where: { tank: { id: tank.id }, kpi },
        });
        if (!sensor) {
          sensor = this.sensorRepository.create({
            type: kpi,
            kpi,
            tank,
          });
          await this.sensorRepository.save(sensor);
          this.logger.log(`Created new sensor for ${kpi} in ${tankName}`);
        }

        const sensorDatum = this.sensorDataRepository.create({
          name: kpi,
          value,
          timestamp,
          sensor,
        });
        await this.sensorDataRepository.save(sensorDatum);
        this.logger.log(`Saved sensor data for ${kpi} in ${tankName}`);
      }
    }
    this.gateway.broadcastSensorData(sensorData); // Broadcast to connected clients
  }

  async create(createSensorDatumDto: any) {
    const sensorDatum = this.sensorDataRepository.create(createSensorDatumDto);
    return this.sensorDataRepository.save(sensorDatum);
  }

  async findAll() {
    return this.sensorDataRepository.find({ relations: ['sensor'] });
  }

  async findOne(id: string) {
    return this.sensorDataRepository.findOne({ where: { id }, relations: ['sensor'] });
  }
}
