// app/api/playlist/route.ts
import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

type CacheEntry = {
  timestamp: number;
  data: unknown;
};

// Cache simples em memória: chave = url da requisição
const cache: Record<string, CacheEntry> = {};

export async function POST(request: NextRequest) {
  console.log(`Valor de NEXT_YOUTUBE_INFO: ${process.env.NEXT_YOUTUBE_INFO}`);
  console.log(`Valor de NEXT_YOUTUBE_PLAYLIST: ${process.env.NEXT_YOUTUBE_PLAYLIST}`);

  const { path, playlistId, limit } = await request.json();

  // Apenas log para debug seguro
  console.log('Recebido path:', path);
  console.log('Recebido playlistId:', playlistId);
  console.log('Recebido limit:', limit);

  // Defina os endpoints com base nas variáveis de ambiente (somente servidor)
  const endpoints: Record<string, string | undefined> = {
    info: process.env.NEXT_YOUTUBE_INFO,
    playlists: process.env.NEXT_YOUTUBE_PLAYLIST,
    playlistlimit: process.env.NEXT_YOUTUBE_PLAYLIST_LIMIT, // corrigido camelCase
  };

  const baseURL = endpoints[path];
  if (!baseURL) {
    console.error('Invalid path parameter ou variável de ambiente não definida');
    return NextResponse.json(
      { error: 'Invalid path parameter or missing environment variable' },
      { status: 400 }
    );
  }

  // Garantir que a URL tenha a barra correta
  const url = `${baseURL.replace(/\/$/, '')}/${playlistId}/${limit}`;
  console.log('URL construída:', url);

  const now = Date.now();
  const cacheEntry = cache[url];

  // 24 horas em ms
  const CACHE_DURATION = 24 * 60 * 60 * 1000;

  if (cacheEntry && now - cacheEntry.timestamp < CACHE_DURATION) {
    return NextResponse.json(cacheEntry.data);
  }

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      console.error('Erro ao consultar serviço externo:', resp.status);
      return NextResponse.json(
        { error: 'Erro ao consultar serviço externo' },
        { status: resp.status }
      );
    }

    const json = await resp.json();

    // Atualiza cache
    cache[url] = { timestamp: now, data: json };

    return NextResponse.json(json);
  } catch (err: unknown) {
    console.error('Erro no fetch:', err);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
