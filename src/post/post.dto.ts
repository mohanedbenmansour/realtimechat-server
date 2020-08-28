export interface PostDTO {
  price: string;
  description: string;
  image: string;
  owner: string;
}
export type UpdatePostDTO = Partial<PostDTO>;
