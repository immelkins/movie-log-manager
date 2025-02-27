export default class Model {
    constructor() {
        this.data = {
            movies: [
                { 
                    movieID: 'm1',
                    title: 'SAMPLE ONE',
                    genre: 'N/A',
                    movieBy: 'NAME ONE',
                    movieDate: 1999, // Ensure it's just a number (year)
                    rating: 9,
                    status: 'Finished',
                },
                { 
                    movieID: 'm2',
                    title: 'SAMPLE TWO',
                    genre: 'N/A',
                    movieBy: 'NAME TWO',
                    movieDate: 2000, // Fix: Corrected from 'movieedDate' if typo existed
                    rating: 5,
                    status: 'Finished',
                },
            ],
        };
    }
}
