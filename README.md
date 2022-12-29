# CareMetx Coding Challenge

## Overview

Your goal is to build an integration tool that loads data from a CSV file, schedules some email
communications, and then executes automated tests to ensure all data and logic was executed
correctly.
Find the sample data file attached to the email.
Project Notes:


### Create a node.js project to load the attached data into a Patients collection in MongoDB.
- The collection will include all the data stored in the input data file.


### Create logic that schedules emails for every patient that has CONSET=Yes.
  - All emails should be stored in an Emails collection.
  - Each email should have an id, name, and scheduled_date.
  - Create multiple emails with the following information:
    - Name: “Day 1”, scheduled_date: NOW+1 day.
    - Name: “Day 2”, scheduled_date: NOW+2 days.
    - Name: “Day 3”, scheduled_date: NOW+3 days.
    - Name: “Day 4”, scheduled_date: NOW+4 days.


### Create an Automation script\Unit tests that test the following conditions:
  - Verify the data in flat file matches the data in Patients collection.
  - Print out all Patient IDs where the first name is missing.