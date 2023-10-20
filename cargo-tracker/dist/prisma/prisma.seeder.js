"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const data = require("./seeder.data.json");
const seed = async () => {
    const prisma = new client_1.PrismaClient();
    const warehouse = await prisma.warehouse.create({
        data: {},
    });
    const sensorNames = [];
    Promise.all(data.map(async (data) => {
        const path = await prisma.path.create({
            data: {
                target_name: data.target_rack_id,
            },
        });
        data.path_sequence.map(async (point) => {
            if (!sensorNames.includes(point.check_point_name)) {
                sensorNames.push(point.check_point_name);
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
    })).then(async () => {
        console.log('sensor 1');
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
//# sourceMappingURL=prisma.seeder.js.map