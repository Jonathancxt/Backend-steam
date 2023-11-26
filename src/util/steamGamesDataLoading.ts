import axios from 'axios';
import {createGame, findAllGames} from '../repository/games.repo';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient({});

export async function oneTimeLoadSteamGames() {
    // const games = await findAllGames();
    // await prisma.review.deleteMany({});
    // await prisma.game.deleteMany({});
    // await prisma.user.deleteMany({});

    const gameIds = [
        '926540',
        '868940',
        '2127500',
        '888800',
        '868420',
        '776550',
        '794060',
        '756100',
        '699710',
        '662970',
        '619550',
        '556280',
        '1145630',
        '1122340',
        '352160',
        '273890',
        // '1033010',
        // '1924490',
        // '2529770',
        // '1075420',
        // '1065610',
        // '494730',
        // '1222970',
        // '1313230',
        // '2421960',
        // '1831830',
        // '554400',
        // '1858630',
        // '2347080',
        // '1331340',
        // '1882500',
        // '1683570',
        // '2248800',
        // '1332430',
        // '1573550',
        // '1420710',
        // '2656040',
        // '2693690',
        // '2448030',
        // '2104420',
        // '1272080',
        // '1377380',
        // '2210340'
    ];

    let res = [];
    if (true) {
        for (const gameId of gameIds) {
            const options = {
                method: 'GET',
                url: 'https://steam-game-search-and-details.p.rapidapi.com/game_details/search_like/game_id/',
                params: {
                    search_value: gameId
                },
                headers: {
                    'X-RapidAPI-Key': '565fcd2247mshdaedeaabfbb3949p11578ejsn68e7dabd0041',
                    'X-RapidAPI-Host': 'steam-game-search-and-details.p.rapidapi.com'
                }
            };
            console.log('Getting game to database!');
            try {
                const response = await axios.request(options);
                res.push(response.data[0]);
                const game = response.data[0];
                if (!game) {
                    console.log('Game not found!');
                    continue;
                }
                console.log('Adding game to database!');
                createGame(
                    game.title,
                    game.game_area_description,
                    game.image_highlight,
                    game.developer,
                    game.release_date,
                    game.responsive_reviewdesc,
                    0
                );
            } catch (error) {}
        }

        const allGamesInDB = await findAllGames();
        console.log(allGamesInDB);
        console.log('COMPLETED!');
    }
}
