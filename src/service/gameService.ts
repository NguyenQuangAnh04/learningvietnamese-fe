import axios from "axios";
import api from "./axiosClient";

export function startGame(gameId?: number, topicId?: number) {
    return api.post(`/game/${gameId}/topics/${topicId}/start`)
}

export function submit(answerDTO: AnswerDTO) {
    return api.post("/game/submit_answer", answerDTO);
}

export function findAllGame() {
    return axios.get("http://localhost:8080/api/game")
}