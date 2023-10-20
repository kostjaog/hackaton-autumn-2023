import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
export declare class WarehousesService {
    create(createWarehouseDto: CreateWarehouseDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWarehouseDto: UpdateWarehouseDto): string;
    remove(id: number): string;
}
