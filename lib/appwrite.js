import { Account, Client, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.mchaora',
    projectId: '66bf5a7a00383246e13d',
    databaseId: '66bf5c22000180310b1c',
    userCollectionId: '66bf5c52002a57dfdc84',
    videoCollectionId: '66bf5c84001d50d445a0',
    storageId: '66bf5f3a0020be642f8a'
};


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    // Register User

    export const createUser = async (email, password, username) => {
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username
            );

            

            if (!newAccount) throw Error;

            const avatarUrl = avatars.getInitials(username);

            await signIn(email, password);

            const newUser = await databeses.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl
                }
            );

            return newUser;

        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
        
    }

    export async function signIn(email, password) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw new Error(error);
        }
    }



