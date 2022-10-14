export const getTrack = (id: number) => {
    const songs = [{
        song: "Rocky Top",
        artist: "Osborne Brothers",
        album: "1968"
    },
    {
        song: "Bringing It Back",
        artist: "J.J. Cale",
        album: "Naturally"
    },
    {
        song: "What's My Age Again?",
        artist: "Blink 182",
        album: "Greatest Hits"
    },
    {
        song: "Suburban Home",
        artist: "Descendents",
        album: "Milo goes to college"
    }];
    return songs[id - 1];
}