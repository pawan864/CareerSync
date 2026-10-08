const mongoose = require('mongoose');
const dotenv = require('dotenv');
const IndustryRole = require('./models/IndustryRole');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const roles = [
    {
        title: 'Software Developer',
        industry: 'IT',
        description: 'Design and build software applications.',
        requiredSkills: [
            { name: 'Java', level: 'Intermediate' },
            { name: 'Spring Boot', level: 'Intermediate' },
            { name: 'SQL', level: 'Intermediate' },
            { name: 'Git', level: 'Beginner' },
            { name: 'REST API', level: 'Intermediate' }
        ]
    },
    {
        title: 'Data Analyst',
        industry: 'IT',
        description: 'Analyze data and generate insights.',
        requiredSkills: [
            { name: 'Python', level: 'Intermediate' },
            { name: 'SQL', level: 'Advanced' },
            { name: 'Excel', level: 'Intermediate' },
            { name: 'Power BI', level: 'Intermediate' },
            { name: 'Statistics', level: 'Intermediate' }
        ]
    }
];

const seedData = async () => {
    try {
        await IndustryRole.deleteMany();
        await IndustryRole.insertMany(roles);
        console.log('Roles seeded successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
