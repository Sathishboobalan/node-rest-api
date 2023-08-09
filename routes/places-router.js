const express = require('express')

const router = express.Router();

const placeRouter = require('../controllers/places-controller')

router.get('/', placeRouter.getAllPlaces) //get all places

router.get('/user/:userId',placeRouter.getAllPlacesCreatedByUser) //get all the places created by the user

router.get('/:id',placeRouter.getPlace) //get place based on place Id

router.patch('/:id', placeRouter.updatePlace) //update place based on id

router.delete('/:id',placeRouter.deletePlace) //delete place based on id

router.put('/',placeRouter.createPlace) //create place

module.exports = router;
