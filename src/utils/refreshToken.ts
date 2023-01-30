import { api } from "../lib/axios";

export async function refreshToken() {
  try {
    const tokenResponse = await localStorage.getItem('@habitsTokenUser');
    let token = JSON.parse(tokenResponse!).token;
    const { data } = await api.post("/refresh-token", { token });
    localStorage.setItem("@habitsTokenUser", JSON.stringify(data.token));
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
