import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    Platform: 'com.anki.aora',
    projectId: '6739a1f60023f05d56cc',
    databaseId: '6739a3b50012bd173f71',
    userCollectionId: '6739a3d400015064f3b0',
    videoCollectionId: '6739a3fe00136ba247e9',
    storageId: '6739a5d9001019bf593f',
}

const { Platform, databaseId, endpoint, projectId, storageId, userCollectionId, videoCollectionId } = appwriteConfig

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.Platform)

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
    try {
        email = email.trim();
        console.log("printing email in appwrite", email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email address format.');
        }

        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) {
            throw new Error('Failed to create account.');
        }

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
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        console.log("Error while creating a user:", error);
        throw new Error(
            error instanceof Error
                ? error.message
                : 'An unexpected error occurred during user creation.'
        );
    }
};


export async function signIn(email: string, password: string) {
    try {

        const session = await account.createEmailPasswordSession(email, password);

        return session;

    } catch (error) {
        console.log(error);
        throw new Error(error instanceof Error ? error.message : String(error))
    }
}

export const getCurrentUser = async () => {
    try {

        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];

    } catch (error) {

    }
}

export const getAllPosts = async () => {
    try {

        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )

        return posts.documents;

    } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err))
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )

        return posts.documents;

    } catch (err) {
        throw new Error(err instanceof Error ? err.message : String(err))
    }
}
