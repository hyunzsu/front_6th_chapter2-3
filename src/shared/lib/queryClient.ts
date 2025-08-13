import { QueryClient } from "@tanstack/react-query"

const QUERY_STALE_TIME = 5 * 60 * 1000 // 5분
const QUERY_GC_TIME = 5 * 60 * 1000 // 5분

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      refetchOnWindowFocus: false,
      throwOnError: false,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error("Mutation 에러:", error)
        // 필요시 토스트 메시지 추가
      },
    },
  },
})
