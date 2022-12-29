const { parse } = require("csv-parse");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// Connect to MongoDB
const mongoDB = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// define patient schema
const patientSchema = new mongoose.Schema({
    patientID: { type: String, required: true },
    firstName: String,
    lastName: String,
    conSet: String
});

// define email schema
const emailSchema = new mongoose.Schema({
    emailID: { type: String, required: true },
    name: String,
    scheduledDate: Date
});

// create patient model from schema
const Patient = mongoose.model('Patient', patientSchema);

// create email model from schema
const Email = mongoose.model('Email', emailSchema);

// parse csv file
parse('./sampleInput.csv', { headers: true }, (err, data) => {
    if (err) throw err;
    // create patients
    data.forEach(patient => {
        const newPatient = new Patient({
            patientID: patient.PatientID,
            firstName: patient.FirstName,
            lastName: patient.LastName,
            conSet: patient.CONSET
        });
        newPatient.save();
    });

    // create emails
    data.forEach(patient => {
        if (patient.CONSET === 'Yes') {
            const email1 = new Email({
                emailID: patient.PatientID + '_1',
                name: 'Day 1',
                scheduledDate: new Date(Date.now() + 86400000)
            });
            email1.save();

            const email2 = new Email({
                emailID: patient.PatientID + '_2',
                name: 'Day 2',
                scheduledDate: new Date(Date.now() + (86400000 * 2))
            });
            email2.save();

            const email3 = new Email({
                emailID: patient.PatientID + '_3',
                name: 'Day 3',
                scheduledDate: new Date(Date.now() + (86400000 * 3))
            });
            email3.save();

            const email4 = new Email({
                emailID: patient.PatientID + '_4',
                name: 'Day 4',
                scheduledDate: new Date(Date.now() + (86400000 * 4))
            });
            email4.save();
        }
    });

    // Automation/Unit Tests
    Patient.find().then(patients => {
        // Verify the data in flat file matches the data in Patients collection
        let isDataEqual = false;
        if (data.length === patients.length) {
            isDataEqual = true;
            data.forEach(filePatient => {
                let patientExists = false;
                patients.forEach(dbPatient => {
                    if (
                        filePatient.PatientID === dbPatient.patientID &&
                        filePatient.FirstName === dbPatient.firstName &&
                        filePatient.LastName === dbPatient.lastName &&
                        filePatient.CONSET === dbPatient.conSet
                    ) {
                        patientExists = true;
                    }
                });
                if (!patientExists) {
                    isDataEqual = false;
                }
            });
        }

        if (isDataEqual) {
            console.log('Data in flat file matches the data in Patients collection.');
        } else {
            console.log('Data in flat file does not match the data in Patients collection.');
        }

        // Print out all Patient IDs where the first name is missing
        let missingFirstNamePatients = [];
        patients.forEach(patient => {
            if (!patient.firstName) {
                missingFirstNamePatients.push(patient.patientID);
            }
        });
        console.log('Patient IDs with missing first name: ', missingFirstNamePatients);
    });
});