import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";
import { Creator, LatestPost, VideoData } from "@/types/type";

export const useAppwrite = (fn: any) => {
    const [data, setData] = useState<VideoData[] | any>();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        try {

            const responses = await fn;

            setData(responses);

        } catch (err: any) {
            Alert.alert("Error", err.message);

        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {

        fetchData();
    }, [])

    const refetch = () => fetchData();

    return { data, isLoading, refetch }

}