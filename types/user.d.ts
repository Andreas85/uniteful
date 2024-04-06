interface IUser {
  title: string;
  content: string;
  _id: string;
  type: string;
  name: string;
  email: string;
  profileImage: string;
}

// ~/@types/news.d.ts
interface INews {
  title: string;
  content: string;
  thumbnailPath: string;
  type: string;
}
