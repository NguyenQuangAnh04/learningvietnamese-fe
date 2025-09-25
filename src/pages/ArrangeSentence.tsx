import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import { useParams } from "react-router-dom";
import { useWindowSize } from "react-use";
import { startGame, submit } from "../service/gameService";



export default function ArrangeSentence() {
    const { gameId, topicId } = useParams();
    const { width, height } = useWindowSize();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [words, setWords] = useState<string[]>([]);
    const [result, setResult] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [playerGameId, setPlayerGameId] = useState<number>(0);
    const [typeGame, setTypeGame] = useState<string>("");

    const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

    // fetch dữ liệu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await startGame(Number(gameId), Number(topicId));
                setQuestions(res.data.questions);
                setPlayerGameId(res.data.playerId);
                setTypeGame(res.data.type);

                // tính index câu tiếp theo
                const lastQuestionId = res.data.lastQuestionId;
                const nextIndex = res.data.questions.findIndex(
                    (q: Question) => q.questionId === lastQuestionId
                ) + 1;
                setCurrentQuestionIndex(nextIndex >= 0 ? nextIndex : 0);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [gameId, topicId]);

    useEffect(() => {
        if (questions.length > 0) {
            setWords(shuffle(questions[currentQuestionIndex].sentence));
            setResult("");
            setIsCorrect(false);
        }
    }, [questions, currentQuestionIndex]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const newWords = Array.from(words);
        const [movedWord] = newWords.splice(result.source.index, 1);
        newWords.splice(result.destination.index, 0, movedWord);
        setWords(newWords);
    };


    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const resetGame = () => {
        if (questions.length > 0) {
            setWords(shuffle(questions[currentQuestionIndex].sentence));
            setIsCorrect(false);
            setResult("");
        }
    };
    const handleSubmitAnswer = async (answerDTO: AnswerDTO) => {
        try {
            const res = await submit(answerDTO);

            if (res.data.correct) {
                setScore(prev => prev + 10);
                setCorrectAnswers(prev => prev + 1);
                setIsCorrect(true);
                setResult("✅ Correct!");
            } else {
                setIsCorrect(false);
                setResult("❌ Wrong, moving to next...");
            }

            if (res.data.complete) {
                setIsCompleted(true);
                setResult("🎉 You completed all questions!");
                return;
            }

            // Tự động next sau 2s
            setTimeout(() => {
                setCurrentQuestionIndex(prev => {
                    const nextIndex = prev + 1;
                    if (nextIndex >= questions.length) {
                        setIsCompleted(true);
                        return prev; // không vượt quá số câu
                    }
                    return nextIndex;
                });
                // reset trạng thái cho câu mới
                setWords(shuffle(questions[currentQuestionIndex + 1]?.sentence || []));
                setIsCorrect(false);
                setResult("");
            }, 2000);

        } catch (err) {
            console.error("Submit answer failed", err);
        }
    };

    const progressPercent =
        questions.length > 0
            ? ((currentQuestionIndex + 1) / questions.length) * 100
            : 0;

    return (
        <div className="bg-[#141f25] min-h-screen text-white">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center p-6">
                {isCorrect && <ReactConfetti width={width} height={height} />}
                {isCompleted && <ReactConfetti width={width} height={height} />}

                {isCompleted ? (
                    // Màn hình kết quả
                    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                        <div className="bg-[#1b262c] p-8 rounded-xl shadow-lg max-w-md w-full">
                            <h1 className="text-3xl font-bold text-green-400 mb-6">🎉 Hoàn thành!</h1>

                            <div className="space-y-4 mb-6">
                                <div className="bg-[#223540] p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Điểm số</h3>
                                    <p className="text-2xl font-bold text-white">{score} điểm</p>
                                </div>

                                <div className="bg-[#223540] p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-300 mb-2">Độ chính xác</h3>
                                    <p className="text-2xl font-bold text-white">
                                        {Math.round((correctAnswers / questions.length) * 100)}%
                                    </p>
                                    <p className="text-sm text-gray-300 mt-1">
                                        {correctAnswers}/{questions.length} câu đúng
                                    </p>
                                </div>

                                <div className="bg-[#223540] p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-yellow-300 mb-2">Xếp hạng</h3>
                                    <p className="text-xl font-bold text-white">
                                        {correctAnswers / questions.length >= 0.9 ? "🏆 Xuất sắc!" :
                                            correctAnswers / questions.length >= 0.7 ? "⭐ Giỏi!" :
                                                correctAnswers / questions.length >= 0.5 ? "👍 Khá!" : "💪 Cố gắng hơn!"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Chơi lại
                                </button>
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Trở về
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Màn hình chơi game
                    <div className="w-full">
                        <h2 className="text-xl font-bold mb-4">
                            Arrange the words into correct sentences
                        </h2>
                        <div className="flex justify-end w-full mb-2">
                            <p>Score: {score} </p>
                        </div>

                        {/* Progress bar */}
                        <div className="relative max-w-[1200px] w-full bg-gray-600 overflow-hidden rounded mb-4">
                            <div
                                className="bg-green-500 h-3 rounded transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>

                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="sentence" direction="horizontal">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex gap-2 flex-wrap p-3 mt-5 rounded-lg min-h-[60px] bg-gray-700"
                                    >
                                        {words.map((word, index) => (
                                            <Draggable
                                                key={index} // key React
                                                draggableId={`word-${index}`} // ID an toàn
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                        className="px-3 py-2 bg-[#223540] text-white rounded shadow cursor-grab select-none"
                                                    >
                                                        {word}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>

                        <div className="flex gap-2 mt-4">
                            <button
                                className="bg-gray-500 px-4 py-2 text-white rounded-lg"
                                onClick={resetGame}
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => handleSubmitAnswer({
                                    gameId: Number(gameId),
                                    questionId: questions[currentQuestionIndex].questionId,
                                    topicId: Number(topicId),
                                    playerId: playerGameId,
                                    answer: words,
                                    optionId: 0
                                })}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Submit Answer
                            </button>
                        </div>

                        {result && <p className="mt-3 font-semibold">{result}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
