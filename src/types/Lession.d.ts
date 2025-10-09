export interface LessonDTO {
    id: number;
    title: string;
    describe: string;
    content: string;
    vocabularies: VocabularyDTO[];
    time: string;
    video_url: string;
    level: string;
    created: string;
    gameCount: number;
    progress: number;
    updated: string;
}


interface VocabularyDTO {
    id: number;
    word: string;
    meaning: string;
    pronunciation: string;
    lessonId: number;
    lesson:string;
}
