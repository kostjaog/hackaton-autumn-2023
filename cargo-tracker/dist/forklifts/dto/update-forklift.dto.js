"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateForkliftDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_forklift_dto_1 = require("./create-forklift.dto");
class UpdateForkliftDto extends (0, mapped_types_1.PartialType)(create_forklift_dto_1.CreateForkliftDto) {
}
exports.UpdateForkliftDto = UpdateForkliftDto;
//# sourceMappingURL=update-forklift.dto.js.map