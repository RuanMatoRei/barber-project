// backend/
import { AppError } from "../errors/appError.js"
import { checkBarberAvaibilityService } from "./checkBarberAvaibilityService.js"

interface ValidateRequest {
    barberId: string,
    date: string, // YYYY-MM-DD
    time: string // HH:mm
}

export class ValidateAppointmentTimeService {
    async execute({ barberId, date, time }: ValidateRequest) {
        const avaibilityService = new checkBarberAvaibilityService()

        const availableSlots = await avaibilityService.execute({
            barberId,
            date
        })

        if(!availableSlots.includes(time)){
            throw new AppError("Selected time is not available", 400)
        }
    }
}