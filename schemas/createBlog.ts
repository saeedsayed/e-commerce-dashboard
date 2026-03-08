import { z as Z } from "zod";

const createBlogSchema = Z.object({
  title: Z.string("title is required")
    .min(3, "the title must be at least 3 character")
    .max(40, "the max title length is 40 character"),
  content: Z.string().min(100, "teh content must be at least 100 character"),
  thumbnail: Z.string("thumbnail is required").url("invalid thumbnail url"),
  tags: Z.array(Z.string("tags is required"), "tags is required").min(
    1,
    "tags should be at least 1",
  ),
});

export default createBlogSchema;

export type TCreateBlogSchema = Z.infer<typeof createBlogSchema>;
