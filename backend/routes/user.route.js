import { Router } from 'express';
import { googleLogin } from '../controllers/user.auth.js';

const router = Router();

router.post('/google-login', googleLogin);

export default router;
