import type {Question} from "../types/testing";

export type CheckResultStatus =
 | "correct"
 | "incorrect"
 | "unanswered"
 | "manual_check"
 | "invalid_data";

 export interface CheckResult {
    score: number;
    maxScore: number;
    status: CheckResultStatus;
 }

 export function checkQuestion (
    question: Question,
    answer?: string | string[],   
 ): CheckResult {
    const maxScore = question.score || 0;

    if (
        answer === undefined ||
        answer === null ||
        answer === "" ||
        (Array.isArray(answer) && answer.length === 0)
    ) {
        return {score: 0, maxScore, status: "unanswered"};
    }

    if (question.type === "text") {
        return {score: 0, maxScore, status:"manual_check"};
    }

    if (question.correct === undefined || question.correct === null) {
        return {score: 0, maxScore, status:"invalid_data"};
    }

    if (question.type === "multiple") {
        if (!Array.isArray(answer)) {
            return {score: 0, maxScore, status:"incorrect"};
        }

        const correctArray = Array.isArray(question.correct)
            ? question.correct
            : [String(question.correct)];
        
        const matchCount = answer.filter(ans =>
            correctArray.includes(ans),
        ).length;

        const sortedAns = [...answer].sort().join(",");
        const sortedCorrect = [...correctArray].sort().join(",");

        if (sortedAns === sortedCorrect) {
            return {score: matchCount, maxScore, status:"correct"};
        } else {
            return {score: matchCount, maxScore, status:"incorrect"};
        }
    }

    if (question.type === "single") {
        if (String(answer).trim() === String(question.correct).trim()) {
            return {score: maxScore, maxScore, status:"correct"};
        } else {
            return {score: 0, maxScore, status:"incorrect"};
        }
    }
    return {score: 0, maxScore, status:"invalid_data"};
}