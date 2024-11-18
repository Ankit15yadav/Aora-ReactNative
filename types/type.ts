export interface VideoData {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[]; // Replace with specific types if known
    $updatedAt: string;
    creator?: Creator | null; // Optional as some entries have `null` creators
    prompt: string;
    thumbnail: string;
    title: string;
    video: string;
}

export interface Creator {
    $collectionId: string;
    $createdAt: string;
    $databaseId: string;
    $id: string;
    $permissions: string[]; // Replace with specific types if known
    $updatedAt: string;
    accountId: string;
    avatar: string;
    email: string;
    username: string;
}

export interface LatestPost {
    id: number; // Ensure `id` exists and is of the correct type
    title?: string;
    thumbnail?: string;
    [key: string]: any; // Other properties, if applicable
}
