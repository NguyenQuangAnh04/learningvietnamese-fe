import { faArrowLeft, faSpinner, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useNavigate, useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { startGame, submit } from '../service/gameService';
import { AnswerDTO, Question } from '../types/Question';

const MultipleGame: React.FC = () => {
    const { nameGame, lessonId } = useParams();
    const { width, height } = useWindowSize();
    const [playerGameId, setPlayerGameId] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [typeGame, setTypeGame] = useState<string>("");
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'vi-VN';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Browser does not support Speech Synthesis');
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [correctOption, setCorrectOption] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [count, setCount] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [bonusScore, setBonusScore] = useState(0);
    const [correctOptionId, setCorrectOptionId] = useState<number | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [gameId, setGameId] = useState<number>(0);

    const handleSubmitAnswer = async (answerDTO: AnswerDTO) => {
        if (isSubmitting || hasSubmitted) return;

        setIsSubmitting(true);
        setHasSubmitted(true);
        setSelectedId(answerDTO.optionId);

        try {
            const res = await submit(answerDTO);
            console.log(res);

            setCorrectOption(res.data.correct);
            setCorrectOptionId(res.data.correctOptionId);

            if (res.data.correct) {
                setScore(prev => prev + 10);
                setCorrectAnswers(prev => prev + 1);
                setCount(prev => prev + 1);
            }

            if (res.data.complete) {
                setIsCompleted(true);
                if (res.data.currentStreak === questions.length) {
                    setBonusScore(20);
                    setTotalScore(res.data.totalScore);
                }
            }
        } catch (error) {
            console.error('Submit error:', error);
        } finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await startGame(nameGame, Number(lessonId));
                console.log(res);

                setQuestions(res.data.questions);
                const lastQuestionId = res.data.lastQuestionId;

                let nextIndex = 0;
                if (lastQuestionId) {
                    const lastIndex = res.data.questions.findIndex((q: Question) => q.questionId === lastQuestionId);
                    nextIndex = lastIndex + 1;

                    if (nextIndex >= res.data.questions.length) {
                        nextIndex = 0;
                    }
                }

                setPlayerGameId(res.data.playerId);
                setGameId(res.data.gameId);
                setTypeGame(res.data.type);
                setCurrentQuestionIndex(nextIndex);
            } catch (error) {
                console.error('Fetch data error:', error);
            }
        }
        fetchData();
    }, [nameGame, lessonId])

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
        return (
            <div className="bg-[#141f25] min-h-screen flex flex-col justify-center items-center text-white p-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
                    <p>Loading game...</p>
                </div>
            </div>
        );
    }

    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setSelectedId(null);
            setHasSubmitted(false);
            setCorrectOptionId(null);
            setCorrectOption(false);
        } else {
            setIsCompleted(true);
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#141f25] to-[#0f1419] min-h-screen flex flex-col justify-center items-center text-white p-4">
            <div className="max-w-2xl w-full">
                {isCompleted && <ReactConfetti width={width} height={height} />}

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(`/topic/${typeGame}`)}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back</span>
                    </button>

                    <div className="text-center">
                        <h1 className="text-xl font-bold">Multiple Choice</h1>
                        <p className="text-sm text-gray-400">Question {currentQuestionIndex + 1} of {questions.length}</p>
                    </div>

                    <div className="text-right">
                        <p className="text-lg font-semibold text-blue-300">Score: {score}</p>
                        <p className="text-sm text-gray-400">{correctAnswers} correct</p>
                    </div>
                </div>

                {isCompleted ? (
                    /* Results Screen */
                    <div className="space-y-4 mb-6">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-yellow-400 mb-2">🎉 Game Complete!</h2>
                            <p className="text-gray-300">Well done! Here are your results:</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/30 p-6 rounded-xl text-center">
                                <h3 className="text-lg font-semibold text-blue-300 mb-3">Base Score</h3>
                                <p className="text-3xl font-bold text-white">{score}</p>
                                <p className="text-sm text-gray-400 mt-1">points</p>

                                {bonusScore > 0 && (
                                    <div className="mt-4 pt-4 border-t border-blue-500/30">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-yellow-300">Perfect Bonus:</span>
                                            <span className="text-lg font-semibold text-yellow-400">+{bonusScore}</span>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-yellow-500/30">
                                            <span className="text-sm text-white font-medium">Total:</span>
                                            <span className="text-xl font-bold text-green-400">{totalScore}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 border border-green-500/30 p-6 rounded-xl text-center">
                                <h3 className="text-lg font-semibold text-green-300 mb-3">Accuracy</h3>
                                <p className="text-3xl font-bold text-white">
                                    {Math.round((correctAnswers / questions.length) * 100)}%
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {correctAnswers}/{questions.length} correct
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 border border-yellow-500/30 p-6 rounded-xl text-center">
                            <h3 className="text-lg font-semibold text-yellow-300 mb-3">Performance Grade</h3>
                            <p className="text-2xl font-bold text-white">
                                {correctAnswers / questions.length >= 0.9 ? "🏆 Excellent!" :
                                    correctAnswers / questions.length >= 0.7 ? "⭐ Good!" :
                                        correctAnswers / questions.length >= 0.5 ? "👍 Fair!" : "💪 Keep trying!"}
                            </p>
                        </div>

                        <div className="flex gap-4 mt-8">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                            >
                                🔄 Play Again
                            </button>
                            <button
                                onClick={() => window.history.back()}
                                className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                            >
                                📚 Back to Topics
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Game Screen */
                    <div className="space-y-6">
                        {/* Progress Bar */}
                        <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                            <div
                                className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500 shadow-lg"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>

                        {/* Question Content */}
                        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6 text-center backdrop-blur">
                            {currentQuestion.questionText.length >= 12 ? (
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold text-white leading-relaxed">
                                        {currentQuestion.questionText}
                                    </h2>
                                    <button
                                        onClick={() => speakText(currentQuestion.questionText)}
                                        className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-colors"
                                        title="Listen to pronunciation"
                                    >
                                        <FontAwesomeIcon icon={faVolumeUp} />
                                        <span>🔊 Listen</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => speakText(currentQuestion.questionText)}
                                    className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl transition-all transform hover:scale-105 font-semibold shadow-lg mx-auto"
                                    title="Listen to pronunciation"
                                >
                                    <FontAwesomeIcon icon={faVolumeUp} className="text-xl" />
                                    <span>🎧 Listen to Pronunciation</span>
                                </button>
                            )}

                            {currentQuestion.image_url && (
                                <img
                                    src={currentQuestion.image_url}
                                    alt="Question visual"
                                    className="max-w-md mx-auto mt-4 rounded-lg shadow-lg"
                                />
                            )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedId === option.id;
                                const isCorrectAnswer = correctOptionId === option.id;
                                const isWrongAnswer = hasSubmitted && isSelected && !isCorrectAnswer;
                                const showResult = hasSubmitted && !isSubmitting;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleSubmitAnswer({
                                            questionId: currentQuestion.questionId,
                                            optionId: option.id,
                                            gameId: gameId,
                                            lessonId: Number(lessonId),
                                            answer: [],
                                            playerId: playerGameId
                                        })}
                                        disabled={hasSubmitted}
                                        className={`
                                            flex items-center space-x-3 rounded-xl p-4 transition-all duration-300 text-left font-medium
                                            ${showResult && isCorrectAnswer
                                                ? "bg-gradient-to-r from-green-600 to-green-700 border border-green-500 shadow-lg transform scale-105"
                                                : showResult && isWrongAnswer
                                                    ? "bg-gradient-to-r from-red-600 to-red-700 border border-red-500"
                                                    : hasSubmitted
                                                        ? "bg-gray-700 border border-gray-600 opacity-60"
                                                        : "bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 hover:from-blue-700 hover:to-blue-800 hover:border-blue-500 transform hover:scale-105 shadow-lg"
                                            }
                                        `}
                                    >
                                        <span className="flex items-center justify-center bg-white/20 rounded-full w-10 h-10 text-white font-bold">
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="flex-1">{option.content}</span>
                                        {isSubmitting && isSelected && (
                                            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-blue-400" />
                                        )}
                                        {showResult && isCorrectAnswer && (
                                            <span className="text-xl">✅</span>
                                        )}
                                        {showResult && isWrongAnswer && (
                                            <span className="text-xl">❌</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Result Feedback */}
                        {hasSubmitted && !isSubmitting && (
                            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-gray-600 rounded-xl p-6 text-center backdrop-blur">
                                <div className="space-y-4">
                                    {correctOption ? (
                                        <div className="text-green-400">
                                            <div className="text-3xl mb-2">🎉</div>
                                            <p className="text-xl font-semibold">Excellent!</p>
                                            <p className="text-green-300">That's the correct answer!</p>
                                        </div>
                                    ) : (
                                        <div className="text-red-400">
                                            <div className="text-3xl mb-2">💔</div>
                                            <p className="text-xl font-semibold">Not quite right</p>
                                            <p className="text-red-300">Don't worry, keep learning!</p>
                                        </div>
                                    )}

                                    {currentQuestion.explanation && (
                                        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                                            <p className="text-gray-300 leading-relaxed">
                                                <span className="font-semibold text-white">💡 Explanation: </span>
                                                {currentQuestion.explanation}
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        className="bg-gradient-to-r from-white to-gray-100 text-gray-900 px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                                        onClick={handleNextQuestion}
                                    >
                                        {currentQuestionIndex < questions.length - 1 ? "➡️ Next Question" : "🏁 View Results"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultipleGame;