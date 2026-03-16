
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Define the Schema here since we can't easily import the TS model with its dependencies in this JS script
const BookSchema = new mongoose.Schema({
    title: String,
    category: String
}, { timestamps: true });

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);

async function updateBooks() {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined in .env.local');
        
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");
        
        // Update Eloquent Javascript to Tech
        const res1 = await Book.updateOne(
            { title: /eloquent javascript/i },
            { category: "tech" }
        );
        console.log("Eloquent Javascript updated:", res1);
        
        // Update resme to Fiction
        const res2 = await Book.updateOne(
            { title: /resme/i },
            { category: "fiction" }
        );
        console.log("resme updated:", res2);
        
        console.log("Books updated with categories!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

updateBooks();
