import { Account, Client, ID, Avatars, Databases, Query } from 'react-native-appwrite';

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

    export async function createUser(email, password, username) {
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

            const newUser = await databases.createDocument(
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

    //SIGN IN
    export async function signIn(email, password) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw new Error(error);
        }
    }

    // GET ACCOUNT
export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }


    //GET CURRENT USER
    export async function getCurrentUser() {
      try {
        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;
    
        const currentUser = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.userCollectionId,
          [Query.equal("accountId", currentAccount.$id)]
        );
    
        if (!currentUser) throw Error;
    
        return currentUser.documents[0];
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    // GET ALL VIDEOS POSTS
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


    // GET LATESTS VIDEOS POSTS
    export async function getLatestPosts() {
      try {
        const posts = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.videoCollectionId,
          [Query.orderDesc("$createdAt"), Query.limit(7)]
        );
    
        return posts.documents;
      } catch (error) {
        throw new Error(error);
      }
    }

    
// GET VIDEO POSTS THAT MATCHES SEARCH QUERY
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
    

// GET VIDEO POSTS CREATED BY USER
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


// SIGN OUT 
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all()
  } catch (error) {
    throw new Error(error);
  }
}



