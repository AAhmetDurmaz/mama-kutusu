const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' })

const Box = require('./Models/Box');
const Meeting = require('./Models/Meeting');

async function mongooseConnect() {
    await mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
}
mongooseConnect().catch(err => console.log(err));

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const date = new Date();

function sortByDate(array) {
    return (array.sort((a, b) => { return new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate); }))
}

app.post('/add-box', async (req, res) => {
    await Box.create({
        position: req.body.position,
        freeDates: req.body.freeDates,
        positionText: req.body.positionText,
        lastModifiedDate: date.getTime(),
    }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ code: 500, message: 'An error occurred.' });
        } else {
            res.json({ code: 200, message: 'Box successfully created.' });
        }
    })
})

app.post('/update-box', async (req, res) => {
    await Box.findOne({ _id: req.body.id }, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ code: 500, message: 'An error occurred.' });
        } else {
            for (let i = 0; i < response.freeDates.length; i++) {
                if (new Date(response.freeDates[i]).getTime() === req.body.date) {
                    response.freeDates.splice(i, 1);
                }
            }
            Box.updateOne({ _id: req.body.id }, { freeDates: response.freeDates }, (err, response) => {
                if (err) {
                    console.log(err);
                    res.json({ code: 500, message: 'An error occurred.' });
                } else {
                    let meeting = new Meeting();
                    meeting.meetingDate = req.body.meetingDate;
                    meeting.name = req.body.name;
                    meeting.phone = req.body.phone;
                    meeting.animalType = req.body.animalType;
                    meeting.foodType = req.body.foodType;
                    meeting.lastModifiedDate = date.getTime();
                    meeting.save((err, insertedNewMeeting) => {
                        if (err) {
                            console.log(err);
                            res.json({ code: 500, message: 'An error occurred.' });
                        } else {
                            res.json({ code: 200, message: 'Meeting creation succeeded.', id: insertedNewMeeting._id });
                        }
                    })
                }
            });
        }
    }).clone().catch(err => { if (err) { console.log(err); res.json({ code: 500, message: 'An error occurred.' }) } });
})

app.get('/boxes', async (req, res) => {
    await Box.find({}, (err, response) => {
        if (err) {
            console.log(err);
            res.json({ code: 500, message: 'An error occurred.' });
        } else {
            if (response !== undefined && response !== null && response !== '') {
                res.send(response);
            }
        }
    }).clone().catch(err => { if (err) { console.log(err); res.json({ code: 500, message: 'An error occurred.' }) } });
})

app.get('/randevu/:id', async (req, res) => {
    if (req.params.id.length === 24) {
        await Meeting.findOne({ _id: req.params.id }, (err, response) => {
            if (err) {
                console.log(err);
                res.json({ code: 500, message: 'An error occurred.' });
            } else {
                if (response !== undefined && response !== null && response !== '') {
                    res.send(response);
                }
            }
        }).clone().catch(err => { if (err) { console.log(err); res.json({ code: 500, message: 'An error occurred.' }) } });
    } else {
        res.json({ code: 500, message: 'An error occurred.' });
    }
})

app.listen(process.env.API_PORT, () => console.log(`API is running on port ${process.env.API_PORT}`));