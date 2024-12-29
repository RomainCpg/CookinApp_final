import express from 'express';
import {
    createAccount,
    getAllAccounts,
    getAccountById,
    updateAccount,
    deleteAccount,
    getIdByPseudo
} from '../controllers/accountController';

const router = express.Router();

router.post('/accounts', createAccount);
router.get('/accounts', getAllAccounts);
router.get('/accounts/:id', getAccountById);
router.put('/accounts/:id', updateAccount);
router.delete('/accounts/:id', deleteAccount);
router.post('/auth/login', getIdByPseudo);

export default router;
