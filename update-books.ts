
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { connectToDatabase } from "./database/mongoose";
import Book from "./database/models/book.model";

async function updateBooks() {
    try {
        await connectToDatabase();
        
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
