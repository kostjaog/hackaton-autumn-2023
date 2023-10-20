"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCheckPointDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_check_point_dto_1 = require("./create-check-point.dto");
class UpdateCheckPointDto extends (0, mapped_types_1.PartialType)(create_check_point_dto_1.CreateCheckPointDto) {
}
exports.UpdateCheckPointDto = UpdateCheckPointDto;
//# sourceMappingURL=update-check-point.dto.js.map