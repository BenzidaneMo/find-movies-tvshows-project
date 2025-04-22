import { Client, Databases, ID, Query } from "appwrite";
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. USE Appwrite to check if the searchTerm exists in the database
    try {
        const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);
        console.log('Response:', response.documents); // Log the response for debugging
        
        // 2. If it does then update the count
        if (response.documents.length > 0) {
            // If the search term exists, update the count
            const documentId = response.documents[0].$id; // Get the document ID of the existing search term
            const updatedCount = response.documents[0].count + 1; // Increment the count

            // Update the document with the new count
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
                count: updatedCount
            });
        }    
        // 3. If it doesn't then create a new document with the searchTerm and count = 1
        else {
            // If the search term doesn't exist, create a new document with count = 1
            console.log('Creating new document for searchTerm:', searchTerm);
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                movie_name: movie.title || movie.name,
                poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''
            });
            console.log('poster url', movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'no-movie.png')
        }
    }
    catch (error) {
        console.error('Error updating search count:', error); // Log any errors for debugging
    }
}

export const getTrendingMoviesBySearchCount = async () => {
    // 1. USE Appwrite to get the searchTerm and count from the database
    // 2. Fetch all documents in a loop until there are no more documents to fetch
    // 3. Use pagination to fetch all documents in batches of 1000
    // 4. Store all documents in the allDocuments array
    try {
        let allDocuments = []; // Array to hold all documents
        let cursor = null; // Cursor for pagination
        const limit = 1000; // Limit for the number of documents to fetch in each request
        while (true) {
          const queries = [Query.limit(limit)];
          // Add cursor for pagination if it exists
          if (cursor) {
            queries.push(Query.cursorAfter(cursor));
          }
          // Fetch documents from Appwrite
          const response = await database.listDocuments(DATABASE_ID, COLLECTION_ID, queries);
          // break if no more documents are returned
          if (response.documents.length === 0) {
            break; // No more documents
          }
          // Add the fetched documents to the allDocuments array
          allDocuments = allDocuments.concat(response.documents);
          cursor = response.documents[response.documents.length - 1].$id;
        }
        // Log the total number of documents fetched
        console.log("Total number of documents:", allDocuments.length);
        return allDocuments;
    }
    catch (error) {
        console.error("Error getting the search count :",error)
    }
}