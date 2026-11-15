
const API_URL = "http://localhost:7000";

// เรียก API และตรวจสอบ Token
export async function Chacktoken(endpoint: string) {

    // 1. เรียก API ครั้งแรก
    let response = await fetch(`${API_URL}${endpoint}`, {
        method: "GET",
        credentials: "include"
    });

    // 2. ถ้าได้ 401 ให้เรียก Refresh Token
    if (response.status === 401) {

        const refresh = await fetch(`${API_URL}/refresh`, {
            method: "POST",
            credentials: "include"
        });

        // 3. ถ้า Refresh สำเร็จ ให้เรียก API เดิมอีกครั้ง
        if (refresh.ok) {

            response = await fetch(`${API_URL}${endpoint}`, {
                method: "GET",
                credentials: "include"
            });

        }
    }

    // 4. ส่ง Response กลับ
    return response;
}
