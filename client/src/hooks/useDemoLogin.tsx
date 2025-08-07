import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export function useDemoLogin() {
  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/demo-login", {});
      return response.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error) => {
      console.error("Demo login failed:", error);
    },
  });

  return { loginMutation };
}