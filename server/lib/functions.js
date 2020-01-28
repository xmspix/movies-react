import fetch from "node-fetch";
import cheerio from "cheerio";

export const getMovieList = async url => {
  return await fetch(url)
    .then(res => res.text())
    .then(async html => {
      var $ = cheerio.load(html);
      let moviesIDs = [];
      await $(".lister-list tr").each(function() {
        // check for movies with rating
        const sID = $('.posterColumn span[name="ir"]', this).attr("data-value");
        if (sID !== "0.0") {
          moviesIDs.push(
            $(".posterColumn a", this)
              .attr("href")
              .split("/")[2]
          );
        }
      });
      return await Promise.all(
        moviesIDs
          .slice(0, 20)
          .map(itm =>
            scrape("https://www.imdb.com/title/" + itm).then(data => data)
          )
      );
    });
};

export const movieSuggestions = async search => {
  return await fetch(
    `https://v2.sg.media-imdb.com/suggestion/${search[0]}/${search}.json`
  )
    .then(res => res.json())
    .then(data => data)
    .catch(err => {
      return err;
    });
};

export const movieFullInfo = async titleID => {
  return await scrape("http://www.imdb.com/title/" + titleID).then(
    async data => {
      const movieID = data.Trailer.embedUrl.split("/video/imdb/")[1];
      const trailer = await GetTrailerKey(movieID).then(async key => {
        return await GetTrailerUrl(key).then(data => data);
      });
      data.HD = trailer;
      return data;
    }
  );
};

const scrape = async url => {
  return await fetch(url)
    .then(res => res.text())
    .then(html => {
      const $ = cheerio.load(html);
      var obj = $("script:contains('@context')").attr(
        "type",
        "application/ld+json"
      );
      const original = JSON.parse(obj[0].children[0].data);
      const newRuntime = original.duration.replace("PT", "");
      const _hours = +newRuntime.split("H")[0];
      const _minutes = +newRuntime.split("H")[1].replace("M", "");
      const runtimeMinutes = _hours * 60 + _minutes;
      const data = {
        Poster: original.image,
        Title: original.name,
        TitleID: original.url.split("/title/")[1].replace("/", ""),
        Year: new Date(original.datePublished).getFullYear(),
        Runtime: runtimeMinutes + " min",
        Genre: original.genre.toString(),
        Director: Array.isArray(original.director)
          ? original.director.map(itm => itm.name).toString()
          : original.director.name,
        Description: original.description,
        Trailer: {
          embedUrl: original.trailer.embedUrl,
          thumbnailUrl: original.trailer.thumbnailUrl
        }
      };
      return data;
    });
};

const GetTrailerKey = async videoID => {
  const url = "http://www.imdb.com/video/" + videoID;
  return await fetch(url)
    .then(res => res.text())
    .then(async html => {
      const $ = cheerio.load(html);
      const test = $("script:contains('playbackDataKey')");
      // get string between two values
      let firstvariable = `"playbackDataKey":`;
      let secondvariable = `"]`;
      let regExString = new RegExp(
        "(?:" + firstvariable + ")(.*?)(?:" + secondvariable + ")",
        "ig"
      );
      let testRE = "{" + regExString.exec(test)[0] + "}";
      // get secure key
      return JSON.parse(testRE).playbackDataKey;
    })
    .catch(err => {
      return err;
    });
};

const GetTrailerUrl = async key => {
  return await fetch(
    "https://www.imdb.com/ve/data/VIDEO_PLAYBACK_DATA?key=" + key
  )
    .then(res => res.json())
    .then(data => {
      return data[0].videoLegacyEncodings;
    })
    .catch(err => {
      return err;
    });
};
