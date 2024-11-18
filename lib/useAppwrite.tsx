import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";

const useAppwrite = (fn: any) => {
    const [data, setData] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            try {

                const responses = await getAllPosts();

                setData(responses);

            } catch (err: any) {
                Alert.alert("Error", err.message);

            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])
}