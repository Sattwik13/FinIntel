import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "FinIntel",
    name: "FinIntel",
    retryFunction: async(attempt) => ({
        delay: Math.pow(2, attempt) * 1000, // Exponential backOff
        maxAttempts: 2
    })
});
