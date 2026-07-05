const express = require('express');
const protect = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { contactSchema } = require('../validators/contactValidator');
const { addContact, getMyContacts, getContactById, updateContact, deleteContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/', protect, validate(contactSchema), addContact);
router.get('/', protect, getMyContacts);
router.get('/:id', protect, getContactById);
router.put('/:id', protect, validate(contactSchema), updateContact);
router.delete('/:id', protect, deleteContact);

module.exports = router;