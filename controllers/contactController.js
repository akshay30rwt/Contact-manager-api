const Contact = require('../models/Contact');
const AppError = require('../utils/AppError');

const addContact = async (req, res, next) => {
    try {
        const { name, phone, email, category } = req.body;

        const contact = new Contact({ name, phone, email, category, user: req.user.userId });
        await contact.save();

        return res.status(201).json({
            message: 'Contact added successfully',
            contact
        });
    }
    catch(error) {
        next(error);
    }
}

const getMyContacts = async (req, res, next) => {
    try {
        contacts = await Contact.find({ user: req.user.userId}).populate('user', 'name email');

        if(contacts.length === 0) {
            return res.status(404).json({
                message: 'There are no saved contacts'
            });
        }

        return res.status(200).json(contacts);
    }
    catch(error) {
        next(error);
    }
}

const getContactById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id).populate('user', 'name email');

        if(!contact) {
            throw new AppError(`Contact with ID: ${id} not found`, 404);
        }

        return res.status(200).json(contact);
    }
    catch(error) {
        next(error);
    }
}