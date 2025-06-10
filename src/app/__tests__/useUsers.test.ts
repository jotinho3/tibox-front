import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { useUsers } from "@/app/hooks/useUsers";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return users", async () => {
    const usersMock = [
      { id: 1, name: "João", email: "joao@email.com" },
      { id: 2, name: "Maria", email: "maria@email.com" },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: usersMock });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toEqual(usersMock);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it("should handle error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useUsers());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Network error");
  });
});