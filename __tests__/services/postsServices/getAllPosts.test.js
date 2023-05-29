// const Post = require("../../../models/post");
// const { getAllPosts } = require("../../../api/posts/services");

// jest.mock("../../../models/post");

// describe(skip)("getAllPosts function", () => {
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   const mockedData = [
//     {
//       id: "1bla",
//       title: "text1",
//       tags: ["a", "b", "c"],
//       user: "123u1",
//       dateCreate: "2023-04-16T00:00:00Z"
//     },
//     {
//       id: "2bla",
//       title: "text2",
//       tags: ["c", "d", "e"],
//       user: "456u2",
//       dateCreate: "2023-04-10T00:00:00Z"
//     },
//     {
//       id: "3bla",
//       title: "text3",
//       tags: ["e", "f", "g"],
//       user: "789u3",
//       dateCreate: "2023-04-08T00:00:00Z"
//     }
//   ];

//   it("should return postsData & postsTotal with filterQuery by default & sortQuery by default, skip = 0, limit = 3, when we didn't pass query to find", async () => {
//     Post.find.mockResolvedValueOnce(mockedData);

//     Post.count.mockResolvedValueOnce(mockedData.length);

//     const result = await getAllPosts();

//     expect(Post.find).toHaveBeenCalledWith({ isDeleted: false }, "", {
//       sort: { _id: "1" },
//       skip: 0,
//       limit: 3
//     });

//     expect(result).toStrictEqual({
//       data: mockedData,
//       page: 1,
//       perPage: 3,
//       total: mockedData.length
//     });

//     expect(result.total).toBe(mockedData.length);
//   });

//   it("should return postsData & postsTotal, when we passed filterQuery, sortQuery & query with page = 3 and perPage = 3", async () => {
//     Post.find.mockResolvedValueOnce(mockedData);

//     Post.count.mockResolvedValueOnce(mockedData.length);

//     const result = await getAllPosts({
//       sortBy: "asc(id),asc(title)",
//       page: 3,
//       perPage: 3,
//       authorId: "1bla,2bla",
//       tag: "a,c",
//       dateGte: "2023-04-07T00:00:00Z",
//       dateLte: "2023-04-20T00:00:00Z"
//     });

//     expect(Post.find).toHaveBeenCalledWith(
//       {
//         isDeleted: false,
//         user: ["1bla", "2bla"],
//         tags: { $in: ["a", "c"] },
//         date: {
//           $gte: "2023-04-07T00:00:00Z",
//           $lte: "2023-04-20T00:00:00Z"
//         }
//       },
//       "",
//       {
//         sort: { id: "1", title: "1" },
//         skip: 6,
//         limit: 3
//       }
//     );

//     expect(result).toStrictEqual({
//       data: mockedData,
//       page: 3,
//       perPage: 3,
//       total: mockedData.length
//     });

//     expect(result.total).toBe(mockedData.length);
//   });

//   it("should return error, when something went wrong", async () => {
//     const error = new Error("Something went wrong");

//     Post.find.mockImplementationOnce(() => {
//       throw error;
//     });

//     expect(async () => await getAllPosts()).rejects.toThrow(error);
//   });
// });
