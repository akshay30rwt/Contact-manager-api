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
        const contacts = await Contact.find({ user: req.user.userId});

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
        const contact = await Contact.findOne({
            _id: id,
            user: req.user.userId
        }).populate('user', 'name email');

        if(!contact) {
            throw new AppError(`Contact with ID: ${id} not found`, 404);
        }

        return res.status(200).json(contact);
    }
    catch(error) {
        next(error);
    }
}

const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, phone, email, category } = req.body;

        const updatedContact = await Contact.findOneAndUpdate({_id: id, user: req.user.userId}, { name, phone, email, category }, { new: true, runValidators: true }).populate('user', 'name email');

        if(!updatedContact) {
            throw new AppError(`Contact with ID: ${id} not found`, 404);
        }

        return res.status(200).json({
            message: 'Contact updated successfully',
            updatedContact
        });
    }
    catch(error) {
        next(error);
    }
}

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findOneAndDelete({_id: id, user: req.user.userId}).populate('user', 'name email');

        if(!deletedContact) {
            throw new AppError(`Contact with ID: ${id} not found`, 404);
        }

        return res.status(200).json({
            message: 'Contact deleted successfully',
            deletedContact
        });
    }
    catch(error) {
        next(error);
    }
}

module.exports = { addContact, getMyContacts, getContactById, updateContact, deleteContact };