import { faArrowLeft, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { startGame, submit } from '../service/gameService';

const MultipleGame: React.FC = () => {
    const { gameId, topicId } = useParams();
    const { width, height } = useWindowSize();
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
            alert('Browser does not support Speech Synthesis');
        }
    };
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [correctOption, setCorrectOption] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [bonusScore, setBonusScore] = useState(0);
    const [correctOptionId, setCorrectOptionId] = useState<number | null>(null);
    const handleSubmitAnswer = async (answerDTO: AnswerDTO) => {
        setIsSubmitting(true);
        const res = await submit(answerDTO);
        setCorrectOption(res.data.correct);
        setCorrectOptionId(res.data.correctOptionId);
        if (res.data.correct) {
            setScore(prev => prev + 10);
            setCorrectAnswers(prev => prev + 1);
        }

        if (res.data.complete) {
            setIsCompleted(true);
            if (res.data.currentStreak === questions.length) {
                setBonusScore(20);
                setTotalScore(res.data.totalScore);
            }
        }
        setIsSubmitting(false);
    }
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    console.log(questions)
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
        return <div className="text-white p-6">❌ Question not found</div>;
    }
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    console.log(score)
    return (
        <div className="bg-[#141f25] min-h-screen flex flex-col justify-center items-center text-white p-6">
            <div className="max-w-md w-full">
                {isCompleted && <ReactConfetti width={width} height={height} />}
                <button onClick={() => navigate(`/topic/${typeGame}`)} className="mb-4 text-gray-300 hover:text-white">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                {isCompleted ? (
                    <div className="space-y-2 mb-6 ">
                        <div className="bg-[#223540] p-4 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-blue-300 mb-2">Base Score</h3>
                            <p className="text-2xl font-bold text-white">{score} points</p>

                            {bonusScore > 0 && (
                                <div className="mt-2 pt-2 border-t border-gray-600">
                                    <div className="flex items-center justify-between ">
                                        <span className="text-sm text-yellow-300"> Perfect Bonus:</span>
                                        <span className="text-lg font-semibold text-yellow-400">+{bonusScore}</span>
                                    </div>
                                </div>
                            )}

                            {bonusScore > 0 && (
                                <div className="mt-1 pt-1 border-t border-gray-500">
                                    <div className="flex items-center justify-between ">
                                        <span className="text-sm text-white font-medium">Total:</span>
                                        <span className="text-xl font-bold text-green-400">{totalScore}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#223540] p-4 rounded-lg text-center">
                            <h3 className="text-sm font-semibold text-green-300 mb-2">Accuracy</h3>
                            <p className="text-xl font-bold text-white">
                                {Math.round((correctAnswers / questions.length) * 100)}%
                            </p>
                            <p className="text-sm text-gray-300 mt-1">
                                {correctAnswers}/{questions.length} correct answers
                            </p>
                        </div>

                        <div className="bg-[#223540] p-4 rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-yellow-300 mb-2">Grade</h3>
                            <p className="text-xl font-bold text-white">
                                {correctAnswers / questions.length >= 0.9 ? "🏆 Excellent!" :
                                    correctAnswers / questions.length >= 0.7 ? "⭐ Good!" :
                                        correctAnswers / questions.length >= 0.5 ? "👍 Fair!" : "💪 Keep trying!"}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-lg px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Play Again
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Back
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between items-center mb-6 mt-2">
                            <h1>Multiple Choice</h1>
                            <h2>Score: {score} | {correctAnswers}/{currentQuestionIndex >= questions.length ? questions.length : currentQuestionIndex + 1}</h2>
                            <h2></h2>
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
                                    title="Listen to question"
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
                                const isCorrectAnswer = correctOptionId === option.id;
                                const isWrongAnswer = isSelected && !isCorrectAnswer;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => {
                                            handleSubmitAnswer({
                                                questionId: currentQuestion.questionId,
                                                optionId: option.id,
                                                gameId: Number(gameId),
                                                topicId: Number(topicId),
                                                answer: [],
                                                playerId: playerGameId
                                            });
                                            setSelectedId(option.id);
                                        }}
                                        disabled={selectedId !== null}
                                        className={`flex items-center space-x-2 rounded-lg p-3 transition-colors
                                        ${isCorrectAnswer
                                                ? "bg-green-600"
                                                : isWrongAnswer
                                                    ? "bg-red-600"
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
                                    <p className="text-red-400 font-semibold">❌ Incorrect!</p>
                                )}
                                <p className="mt-2 text-gray-300">{currentQuestion.explanation}</p>
                                {selectedId !== null && (
                                    <button
                                        className="bg-white text-black text-center px-4 py-2 rounded-lg font-semibold mt-4"
                                        onClick={() => {
                                            if (currentQuestionIndex < questions.length - 1) {
                                                setCurrentQuestionIndex(i => i + 1);
                                                setSelectedId(null);
                                                // setCorrectOptionId(null);
                                                // setCorrectOption(false);
                                            } else {
                                                setIsCompleted(true);
                                            }
                                        }}
                                    >
                                        Next Question
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
