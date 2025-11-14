# AskCosmoAI
an AI Chat Bot that will answer all your questions related to BYU!

## Tentative Diagram
![IMG_4070](https://github.com/user-attachments/assets/2d743577-2f6c-4500-900c-0c37f308c0ce)
(still not 100% how exactly we want to handle the vectorization, will probably change later)


 **OpenAI embedding info:** 
 <https://openai.com/index/new-embedding-models-and-api-updates/?utm_source=chatgpt.com>
 
 Guide: <https://platform.openai.com/docs/guides/embeddings>

 * looks like you can do vector embedding on pinecone! <https://www.pinecone.io/blog/simplifying-vector-embeddings-with-pinecone-hosted-inference/>

## Scraping ##
Our starting goal is to scrape this single webpage:
<https://academiccalendar.byu.edu/2025-calendar-list-view>

## Running the Backend
Before you run the backend, make sure you have dotnet 9 installed on your machine. Go into the web/api directory and run the following command `dotnet tool restore`

To start the backend, run `dotnet run`

## Running the Frontend
Make sure you have NPM installed. The first time you run the frontend, first run `npm i`

To start the frontend, run `npm run dev`
