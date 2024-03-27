interface IUser {
  title: string;
  content: string;
  _id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
}

// ~/@types/news.d.ts
interface INews {
  title: string;
  content: string;
  thumbnailPath: string;
  type: string;
}
