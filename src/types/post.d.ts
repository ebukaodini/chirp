export default interface PostInterface {
  id: number,
  claps: number,
  like: boolean,
  content: string,
  tags: Array<string>
}