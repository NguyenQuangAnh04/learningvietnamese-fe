interface Option {
    id: number;
    content: string;

    correct: boolean;
}

interface Question {
    id: number;
    questionText: string;
    image_url: string;
    questionId: number;
    options: Option[];
    explanation: string;
}

interface AnswerDTO {
    gameId: number;
    questionId: number;
    playerId: number;
    topicId: number;
    answer: string;
    optionId: number;
}