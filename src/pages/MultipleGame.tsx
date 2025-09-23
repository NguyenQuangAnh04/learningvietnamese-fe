import { faArrowLeft, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { startGame, submit } from '../service/gameService';

const MultipleGame: React.FC = () => {
    const { gameId, topicId } = useParams();
    const [playerGameId, setPlayerGameId] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [typeGame, setTypeGame] = useState<string>("");
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            // Dừng speech hiện tại nếu có
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Cấu hình voice (có thể tùy chỉnh)
            utterance.lang = 'id-ID'; // hoặc 'ja-JP' cho tiếng Nhật
            utterance.rate = 1; // tốc độ đọc
            utterance.pitch = 1; // cao độ
            utterance.volume = 1; // âm lượng

            window.speechSynthesis.speak(utterance);
        } else {
            alert('Trình duyệt không hỗ trợ Speech Synthesis');
        }
    };

    const [correctOption, setCorrectOption] = useState<boolean | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const handleSubmitAnswer = async (answerDTO: AnswerDTO) => {
        const res = await submit(answerDTO);
        setCorrectOption(res.data.correct);

        if (res.data.correct) {
            setScore(prev => prev + 10);
        }

        if (res.data.complete) {
            setIsCompleted(true);
        }
    }
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const res = await startGame(Number(gameId), Number(topicId));
            setQuestions(res.data.questions);
            const lastQuestionId = res.data.lastQuestionId;
            const nextIndex = res.data.questions.findIndex((q: Question) => q.questionId === lastQuestionId) + 1;
            setPlayerGameId(res.data.playerId);
            setTypeGame(res.data.type);
            setCurrentQuestionIndex(nextIndex >= 0 ? nextIndex : 0)
        }
        fetchData()
    }, [])
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        return <div className="text-white p-6">❌ Không tìm thấy câu hỏi</div>;
    }
    const maxScore = questions.length * 10;
    const finalPercent = Math.round((score / maxScore) * 100);
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    const finalScore = score;
    console.log(score)
    return (
        <div className="bg-[#141f25] min-h-screen text-white p-6">
            <div className="max-w-[1200px] mx-auto ">
                <button onClick={() => navigate(`/topic/${typeGame}`)} className="mb-4 text-gray-300 hover:text-white">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                {isCompleted ? (
                    <div className=''>
                        <div className="mt-10 p-6 bg-[#1b262c] rounded-lg text-center ">
                            <h2 className="text-2xl font-bold text-green-400">🎉 Quiz Completed!</h2>
                            <p className="text-white mt-2">Your final score: {finalScore}</p>

                            <div>

                                <button
                                    className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors'
                                    onClick={() => window.location.reload()}
                                >
                                    Play again
                                </button>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-6 mt-2">
                            <h1>Multiple Choice</h1>
                            <h2>Score {currentQuestionIndex + 1} / {questions.length} | Point: {score}</h2>
                        </div>

                        <div className="relative max-w-[1200px] w-full bg-gray-600 overflow-hidden rounded">
                            <div
                                className="bg-green-500 h-3 rounded transition-all duration-300 z-10"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>

                        <div className="mt-5 flex items-center justify-center flex-col space-y-2">
                            {
                                currentQuestion.questionText.length >= 12 && (
                                    <h1 className="text-center">{currentQuestion.questionText}</h1>
                                )
                            }                            {currentQuestion.questionText.length < 12 && (
                                <button
                                    onClick={() => speakText(currentQuestion.questionText)}
                                    className="flex items-center space-x-2 bg-gray-500  text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                                    title="Đọc câu hỏi"
                                >
                                    <FontAwesomeIcon icon={faVolumeUp} />
                                    <span>Listen to Pronunciation</span>
                                </button>
                            )}
                            <img
                                src={currentQuestion.image_url}
                                alt=""
                                className="max-w-[500px] object-contain"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-5">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedId === option.id;
                                const isCorrect = option.correct;
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => {
                                            handleSubmitAnswer({
                                                questionId: currentQuestion.questionId,
                                                optionId: option.id,
                                                gameId: Number(gameId),
                                                topicId: Number(topicId),
                                                answer: option.content ? option.content : "",
                                                playerId: playerGameId
                                            }); setSelectedId(option.id)
                                        }}
                                        disabled={selectedId !== null} // chỉ cho chọn 1 lần
                                        className={`flex items-center space-x-2 rounded-lg p-3 transition-colors
                                        ${isSelected
                                                ? correctOption === null
                                                    ? "bg-[#1b262c]" // chưa submit → giữ màu mặc định
                                                    : correctOption
                                                        ? "bg-green-600" // đúng
                                                        : "bg-red-600"   // sai
                                                : "bg-[#1b262c] hover:bg-[#0f4c75]"
                                            }`}

                                    >
                                        <span className="flex items-center justify-center bg-[#354047] rounded-full w-8 h-8">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span>{option.content}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedId !== null && (
                            <div className="mt-5 p-4 bg-[#1b262c] rounded-lg flex justify-center items-center flex-col">
                                {correctOption ? (
                                    <p className="text-green-400 font-semibold">✅ Correct!</p>
                                ) : (
                                    <p className="text-red-400 font-semibold">❌ InCorrect!</p>
                                )}
                                <p className="mt-2 text-gray-300">{currentQuestion.explanation}</p>
                                {selectedId !== null && (
                                    <button
                                        className="bg-white text-black text-center px-4 py-2 rounded-lg font-semibold mt-4"
                                        onClick={() => {
                                            if (currentQuestionIndex < questions.length - 1) {
                                                setCurrentQuestionIndex(i => i + 1);
                                                setSelectedId(null);
                                                setCorrectOption(null);
                                            } else {
                                                setIsCompleted(true); // quiz hoàn thành
                                            }
                                        }}
                                    >
                                        Next question
                                    </button>


                                )}
                            </div>
                        )}
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default MultipleGame;
