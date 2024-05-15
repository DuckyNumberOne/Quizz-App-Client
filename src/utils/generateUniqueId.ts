 export function generateUniqueId() {
    // Tạo một chuỗi ngẫu nhiên có độ dài 8 ký tự từ các ký tự a-z và số từ 0-9
    const randomString = Math.random().toString(36).substring(2, 10);
    // Tạo một timestamp từ thời gian hiện tại
    const timestamp = Date.now();
    // Kết hợp chuỗi ngẫu nhiên và timestamp để tạo ID
    const uniqueId = randomString + timestamp;
    return uniqueId;
  }