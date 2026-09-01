function defaultWait(delayMs) {
    return new Promise((resolve) => setTimeout(resolve, delayMs));
}
export async function waitForStudioBookReady(bookId, options = {}) {
    const fetchImpl = options.fetchImpl ?? fetch;
    const wait = options.wait ?? defaultWait;
    const maxAttempts = options.maxAttempts ?? 900;
    const retryDelayMs = options.retryDelayMs ?? 1000;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        const encodedBookId = encodeURIComponent(bookId);
        const statusResponse = await fetchImpl(`/api/v1/books/${encodedBookId}/create-status`);
        if (statusResponse.ok) {
            const status = await statusResponse.json();
            if (status.status === "error") {
                throw new Error(status.error || `Book "${bookId}" creation failed.`);
            }
            if (status.status === "creating") {
                if (attempt < maxAttempts) {
                    await wait(retryDelayMs);
                    continue;
                }
                break;
            }
        }
        const response = await fetchImpl(`/api/v1/books/${encodedBookId}`);
        if (response.ok) {
            return await response.json();
        }
        if (attempt < maxAttempts && response.status === 404) {
            await wait(retryDelayMs);
            continue;
        }
        break;
    }
    throw new Error(`Book "${bookId}" was not ready after ${maxAttempts} attempts.`);
}
//# sourceMappingURL=book-ready.js.map