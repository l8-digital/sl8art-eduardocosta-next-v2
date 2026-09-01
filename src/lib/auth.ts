// src/api/auth.ts
import axios from "axios";
import { env } from "./env";

let siteToken: string | null = null;
let tokenExpiresAt: number | null = null; // timestamp em milissegundos

// === Função principal de autenticação ===
export async function authenticate() {
  const authToken = Buffer
    .from(`${env.API_CLIENT_ID}-${env.API_SECRET}`, "utf-8")
    .toString("base64");

  if (!env.API_ENDPOINT_AUTH) {
    throw new Error("API_ENDPOINT_AUTH não configurado");
  }

  const res = await axios.get(env.API_ENDPOINT_AUTH, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`,
    }
  });

  const data = res.data;

  siteToken = data?.token?.token ?? null;

  const expiredString = data?.token?.expires_at;

  if (expiredString) {
    tokenExpiresAt = new Date(expiredString).getTime();
  } else {
    tokenExpiresAt = Date.now() + 5 * 60 * 1000;
  }

  if (!siteToken) {
    throw new Error("Não foi possível obter o token");
  }
}

function isTokenExpired(): boolean {
  if (!tokenExpiresAt) return true;
  return Date.now() >= tokenExpiresAt;
}

export async function getToken(): Promise<string> {
  if (!siteToken || isTokenExpired()) {
    console.log("🔄 Token expirado ou inexistente — gerando novo token...");
    try {
      await authenticate();
    } catch {
      return "";
    }
  }
  return siteToken ?? "";
}

// === Apenas para depuração ===
export function resetToken() {
  siteToken = null;
  tokenExpiresAt = null;
}
