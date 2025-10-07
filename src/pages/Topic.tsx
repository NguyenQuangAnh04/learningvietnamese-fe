import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../service/axiosClient";

interface Topic {
    name: string;
    id: number;
    description: string | null;
    gameId: number;
    score: number;
    questionId: number;
    completed: boolean;
}

export default function Topic() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);
    const { lessonId } = useParams();
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await api.get(`/topic/${lessonId}`)

                setTopics(res.data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, [lessonId]);
    const navigate = useNavigate();
    if (loading) return <p className="text-center text-white">Loading...</p>;
    return (
        <div className="bg-[#141f25] min-h-screen text-white">
            <div className="max-w-[1200px] mx-auto w-full p-4">
                <button
                    onClick={() => navigate("/games")}
                    className="text-gray-300 hover:text-white"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>
                <h2 className="text-2xl font-bold mt-2">Choose a Topic</h2>

                <div className="flex flex-col gap-4 mt-4">
                    {topics.map((topic, idx) => (
                        <div
                            key={idx}
                            className="p-4 bg-[#1e2a32] border border-gray-700 rounded-xl 
                         shadow-sm hover:shadow-md transition flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold text-lg">{topic.name}</h3>
                                <p className="text-sm text-gray-400">
                                    {topic.description || "No description"}
                                </p>
                            </div>
                            <button onClick={() => navigate(`/games/${topic.id}`)} className="bg-green-600 px-4 py-2 rounded">Play</button>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
