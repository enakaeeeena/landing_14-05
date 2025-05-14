export const fakeDb = {
  professors: [],
  users: [
    {
      user_id: 1,
      FirstName: "Алексей",
      LastName: "Иванов",
      Patronymic: "Петрович",
      profession: "Разработчик",
      photo: "/photos/users/1.jpg",
      description: "Фронтенд разработчик",
      social: {
        vk: "https://vk.com/example",
        github: "https://github.com/example",
      },
      social_description: "Веду блог на GitHub",
      login: "alex_ivanov",
      password_hash: "hashed_pwd",
      salt: "random_salt",
      Email: "alex@example.com",
      status: "active",
      program_id: 1,
    },
  ],
  works: [
    {
      work_id: 1,
      user_id: 1,
      date: "2024-03-01",
      name: "ToDo App",
      work_description: "Ляляля",
      sphere: "Web",
      status: "Готово",
      photos: ["/photos/works/1a.jpg", "/photos/works/1b.jpg"],
      favorite: true,
    },
  ],
  programs: [
    {
      program_id: 1,
      name: "Frontend Development",
      menu: ["HTML", "CSS", "JavaScript", "React"],
    },
  ],
  reviews: [
    {
      reviews_id: 1,
      program_id: 1,
      user_id: 1,
      review: "Лялялялялялялялляяляляляля!",
      favorite: true,
    },
  ],
  professors_programs: [
    {
      program_id: 1,
      professors_id: 1,
      favorite: true,
    },
  ],
  pages: [
    {
      page_id: 1,
      program_id: 1,
    },
  ],
  blocks: [
    {
      block_id: 1,
      page_id: 1,
      data: { title: "Введение", content: "Описание первой темы." },
      isExample: false,
      type: 1,
      next_block_id: null,
      previews_block_id: null,
    },
  ],
  forms: [
    {
      forms_id: 1,
      block_id: 1,
      data: { question: "Что вы узнали?" },
      date: "2024-03-15",
    },
  ],
  likes: [
    {
      like_id: 1,
      work_id: 1,
    },
  ],
  admins: [
    {
      user_id: 1,
      program_id: 1,
    },
  ],
  tokens: [
    {
      token_id: "abc123",
    },
  ],
};

export const fetchData = (key) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(fakeDb[key]), 500);
  });

// Примеры использования:
// fetchData("professors").then(console.log);
// fetchData("works").then(console.log);
