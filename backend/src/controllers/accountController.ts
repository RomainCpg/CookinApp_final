// src/controllers/AccountController.ts
import { Request, Response } from 'express';
import Account from '../models/Account';

// Créer un compte
export const createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, pseudo, dateOfCreation } = req.body;
        const account = await Account.create({ firstName, lastName, pseudo, dateOfCreation });
        res.status(201).json(account);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Error creating account', error });
    }
};

// Obtenir tous les comptes
export const getAllAccounts = async (req: Request, res: Response): Promise<void> => {
    try {
        const accounts = await Account.findAll();
        res.status(200).json(accounts);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Error fetching accounts', error });
    }
};

// Obtenir un compte par ID
export const getAccountById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const account = await Account.findByPk(id);
        if (!account) {
            res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Error fetching account', error });
    }
};

// Mettre à jour un compte
export const updateAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { firstName, lastName, pseudo, dateOfCreation } = req.body;

        const account = await Account.findByPk(id);
        if (!account) {
            res.status(404).json({ message: 'Account not found' });
        }

        await account?.update({ firstName, lastName, pseudo, dateOfCreation });
        res.status(200).json(account);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Error updating account', error });
    }
};

// Supprimer un compte
export const deleteAccount = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const account = await Account.findByPk(id);
        if (!account) {
            res.status(404).json({ message: 'Account not found' });
        }
        await account?.destroy();
        res.status(204).json({ message: 'Account deleted successfully' });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Error deleting account', error });
    }
};

// Obtenir l'id via le pseudo
export const getIdByPseudo = async (req: Request, res: Response): Promise<void> => {
    const { pseudo } = req.body;

    if (!pseudo) {
        res.status(400).json({ message: 'Pseudo is required' });
        return;
    }

    try {
        const user = await Account.findOne({ where: { pseudo } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({ id: user?.id });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
