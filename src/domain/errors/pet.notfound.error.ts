import { CustomError } from "./custom.error";

export default class PetNotFoundError extends CustomError {
    constructor() {
        super( 'Pet not found', '0001' )
    }
}
