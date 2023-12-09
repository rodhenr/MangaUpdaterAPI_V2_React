## :ledger: Manga Updater

Track and follow your favorite manga series effortlessly with this front-end project. This application enables you to stay updated on the latest chapter releases for all your favorite mangas. This project allow you to navigate through your manga collection with ease and never miss a new chapter.

## :man_technologist: Tecnologias

For this project, the following technologies were used:

- [Axios](https://axios-http.com/ptbr/docs/intro)
- [React](https://pt-br.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)
- [UUID](https://www.uuidgenerator.net/)
- [React Query](https://tanstack.com/query/latest/)

## :dvd: How to Replicate This Project

1. Follow the instructions in the [MangaUpdaterAPI_V2_CSharp](https://github.com/rodhenr/MangaUpdaterAPI_V2_CSharp) repository to set up the database and backend project.

2. Open the terminal and navigate to this project folder.

3. Build the Docker image using the following command:

    ```bash
    docker build -t mangaupdater-frontend .
    ```

4. Run the Docker container with the following command:

    ```bash
    docker run -d --rm -p 5173:5173 --name mangaupdater-frontend mangaupdater-frontend
    ```

5. The MangaUpdater Frontend will be accessible at [http://localhost:5173/](http://localhost:5173/) on your local machine.
