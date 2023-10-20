import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
export declare class WarehousesController {
    private readonly warehousesService;
    constructor(warehousesService: WarehousesService);
    create(createWarehouseDto: CreateWarehouseDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateWarehouseDto: UpdateWarehouseDto): string;
    remove(id: string): string;
}
