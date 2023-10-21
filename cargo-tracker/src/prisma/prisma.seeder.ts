/* eslint-disable prefer-const */
import { PrismaClient } from '@prisma/client';
import * as data from './seeder.data.json';

const seed = async () => {
  const prisma = new PrismaClient();
  const warehouse = await prisma.warehouse.create({
    data: {
      name: '#1',
    },
  });

  //@ts-ignore
  const sensorNames = [];
  // @ts-ignore
  Promise.all(
    data.map(async (data) => {
      const path = await prisma.path.create({
        data: {
          target_name: data.target_rack_id,
        },
      });
      // @ts-ignore
      data.path_sequence.map(async (point) => {
        //@ts-ignore
        if (!sensorNames.includes(point.check_point_name)) {
          sensorNames.push(point.check_point_name);
          //@ts-ignore
          console.log(point.check_point_name, sensorNames);
        }
        await prisma.check_point.create({
          data: {
            name: point.check_point_name,
            next_check_point_distance: point.next_check_point_distance,
            path: {
              connect: {
                id: path.id,
              },
            },
          },
        });
      });
    }),
  ).then(async () => {
    console.log('sensor 1');

    //@ts-ignore
    sensorNames.map(async (sensor) => {
      console.log('sensor 2');
      await prisma.sensor.create({
        data: {
          name: sensor,
          warehouse: {
            connect: {
              id: warehouse.id,
            },
          },
        },
      });
    });
  });
};

seed();
