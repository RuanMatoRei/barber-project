import { UpdateBarberProfileService } from '../services/updateBarberProfileService.js';

export async function updateBarberProfileController(req: any, res: any) {
  const service = new UpdateBarberProfileService();

  const profile = await service.execute({
    userId: req.user.id,
    ...req.body
  });

  return res.status(200).send(profile);
}