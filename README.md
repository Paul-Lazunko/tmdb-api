The test task was implemented on express.js (due to its flexibility and absence of strict initial requirements) 
and without the using of ready-made solutions and outer packages for working with the provided third-party api,
it took me some time to dive in and investigate this api.

The main idea of the application is the getting the provided range of data 
from a third-party api when the application is started and store it in the cache (hash-tables in a somewhat redundant way)
and further working with the cache.

It seems to me that this data is static, but - since this is a third-party API
and theoretically this data can be changed - I added a background data sync that happens every 5 minutes.

So, You can run it in the next way:

1. Clone this repo.

2. Install dependencies:

```shell

npm i

```

3. Build the code:

```shell

npm run build

```

4. Start application with providing The Movie DB api_key as TMDB_API_KEY environment variable
   (аor my part, it would be incorrect to store such a sensitive data in the code which is in the public access )

```shell

 TMDB_API_KEY={api_key} npm start

```

5. API docs will be available at the http://localhost:3000/swagger URL


6. Tests may be run using the next command (make sure you stop the previously started application to avoid conflicts of ports availability):

```shell

 TMDB_API_KEY={api_key} npm t

```

7. Docker based solution.
  
You have to provide .env file to the project root directory using .env.example as base.
Then You can run:

```shell

docker-compose up -d --build

```

Notes:

- a little fixed list of movies as it had broken structure 
(You can find proper at the /src/constants/target-movies)
- persons ids were not provided at the task description 
and this may complicate a little the testing process for You, 
so I prepared the next data to fix it
```js
{
  'Brie Larson': 60073
  'Samuel L. Jackson': 2231
  'Anthony Mackie': 53650
  'Don Cheadle': 1896
  'Tom Holland': 1136406
  'Gwyneth Paltrow': 12052
  'Tom Hiddleston': 91606
  'Scarlett Johansson': 1245
  'Mark Ruffalo': 103
  'Bradley Cooper': 51329
  'Robert Downey Jr.': 3223
  'Karen Gillan': 543261
  'Danai Gurira': 82104
  'Chris Evans': 16828
  'Paul Rudd': 22226
  'Jeremy Renner': 17604
  'Chris Hemsworth': 74568
  'Josh Brolin': 16851
  'Michael B. Jordan': 135651
  'Dave Bautista': 543530
  'Chris Pratt': 73457
  'Zoe Saldana': 8691

}
```
- really sorry for ugly git history: I wrote the code on the fly in one hop 
and wanted to provide a result asap, but - knowing that the git history 
should reflect the development history chronologically and logically and each new update/diff should keep the code 
at least compilable - if it is critical, I can spend an extra couple of hours to bring it in order and make perfect.

Best regards,
Pavlo
