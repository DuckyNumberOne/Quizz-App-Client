 export function generateUniqueId() {
    const randomString = Math.random().toString(36).substring(2, 10);
    const timestamp = Date.now();
    const uniqueId = randomString + timestamp;
    return uniqueId;
  }