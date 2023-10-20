"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePathDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_path_dto_1 = require("./create-path.dto");
class UpdatePathDto extends (0, mapped_types_1.PartialType)(create_path_dto_1.CreatePathDto) {
}
exports.UpdatePathDto = UpdatePathDto;
//# sourceMappingURL=update-path.dto.js.map