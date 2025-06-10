import { renderHook, act, waitFor } from "@testing-library/react";
import axios from "axios";
import { useIdeas } from "@/app/hooks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useIdeas", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return ideas", async () => {
    const ideasMock = [
      {
        id: 1,
        title: "Ideia 1",
        description: "Descrição 1",
        createdBy: { id: 1, name: "João", email: "joao@email.com" },
        votes: 2,
        votedBy: [],
        createdAt: new Date().toISOString(),
        comments: [],
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: ideasMock });

    const { result } = renderHook(() => useIdeas());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.ideas).toEqual(ideasMock);
    expect(result.current.error).toBeNull();
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it("should handle fetch error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useIdeas());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.ideas).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });

  it("should create a new idea", async () => {
    const ideaMock = {
      id: 2,
      title: "Nova Ideia",
      description: "Descrição nova",
      createdBy: { id: 2, name: "Maria", email: "maria@email.com" },
      votes: 0,
      votedBy: [],
      createdAt: new Date().toISOString(),
      comments: [],
    };
    mockedAxios.post.mockResolvedValueOnce({ data: ideaMock });

    const { result } = renderHook(() => useIdeas());

    // Aguarda o carregamento inicial
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      const created = await result.current.createIdea({
        title: ideaMock.title,
        description: ideaMock.description,
        createdById: ideaMock.createdBy.id,
      });
      expect(created).toEqual(ideaMock);
    });
  });

  it("should get idea by id", async () => {
    const ideaMock = {
      id: 3,
      title: "Buscar Ideia",
      description: "Descrição buscar",
      createdBy: { id: 3, name: "Carlos", email: "carlos@email.com" },
      votes: 1,
      votedBy: [],
      createdAt: new Date().toISOString(),
      comments: [],
    };
    mockedAxios.get.mockResolvedValueOnce({ data: ideaMock });

    const { result } = renderHook(() => useIdeas());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const idea = await result.current.getIdeaById(3);
    expect(idea).toEqual(ideaMock);
  });

  it("should vote for an idea", async () => {
    const voteResponse = { votes: 5, votedBy: ["João"] };
    mockedAxios.post.mockResolvedValueOnce({ data: voteResponse });

    const { result } = renderHook(() => useIdeas());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const votes = await result.current.voteIdea(1, "João");
    expect(votes).toBe(5);
    expect(mockedAxios.post).toHaveBeenCalled();
  });

  it("should add a comment to an idea", async () => {
    const commentMock = {
      id: 10,
      ideaId: 1,
      userId: 2,
      message: "Comentário teste",
      createdAt: new Date().toISOString(),
    };
    mockedAxios.post.mockResolvedValueOnce({ data: commentMock });

    const { result } = renderHook(() => useIdeas());

    await waitFor(() => expect(result.current.loading).toBe(false));

    const comment = await result.current.addComment(1, {
      userId: 2,
      message: "Comentário teste",
    });
    expect(comment).toEqual(commentMock);
    expect(mockedAxios.post).toHaveBeenCalled();
  });
});