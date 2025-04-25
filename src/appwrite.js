import { Client, Databases, ID, Query } from "appwrite";
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // Ensure 'movie' object and movie.id exist
    if (!movie || !movie.id) {
        console.error("Error: 'movie' object or 'movie.id' is missing.");
        return; // Exit if essential data is missing
    }
    // 1. USE Appwrite to check if a document with this movie_id already exists
    try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('movie_id', movie.id) // *** KEY CHANGE: Query by movie_id ***
        ]);
        console.log('Response documents found:', response.documents.length); // Log the number of documents found
        
        // 2. If a document with this movie_id exists, update its count
        if (response.documents.length > 0) {
            // If the search term exists, update the count
            const documentId = response.documents[0].$id; // Get the document ID of the existing search term
            const updatedCount = response.documents[0].count + 1; // Increment the count

            // Update the document with the new count
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
                searchTerm: searchTerm,
                count: updatedCount
            });
        }    
        // 3. If no document exists for this movie_id, create a new one with count = 1
        else {
            console.log(`No document found for movie_id: ${movie.id}. Creating new document.`);
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                movie_id: movie.id,
                count: 1,
                searchTerm: searchTerm,
                movie_name: movie.title || movie.name,
                poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
            });
            console.log('poster url', movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no-movie.png')
        }
    }
    catch (error) {
        console.error('Error updating search count:', error); // Log any errors for debugging
    }
}

export const getTrendingMoviesBySearchCount = async () => {
    try {
        // Example: Fetch all documents, maybe limit and order by count
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('count'), // Sort by count descending
            Query.limit(9) // limit to the top 20 trending movies
        ]);
        return response.documents;
    } catch (error) {
        console.error("Error fetching documents from Appwrite:", error);
        return []; // Return empty array on error
    }
}