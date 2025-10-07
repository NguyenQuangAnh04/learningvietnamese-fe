interface Option {
    id: number;
    content: string;

    correct: boolean;
}

export interface Question {
    id: number;
    questionText: string;
    image_url: string;
    gameId: number;
    lessonId: number;
    questionId: number;
    audio_url: string;
    options: Option[];
    sentence: string[];
    explanation: string;
}

interface AnswerDTO {
    gameId: number;
    questionId: number;
    playerId: number;
    lessonId: number;
    answer: string[];
    optionId: number;
}