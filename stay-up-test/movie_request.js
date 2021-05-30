movieSearch = function () {
  const apikey = "2fb7569a";
  const search = document.getElementById("search").value + "";

  let url = `https://www.omdbapi.com/?apikey=${apikey}&t=${search}`; //原来协议及apikey赋值错误
  let http = new XMLHttpRequest();

  //访问网站必须提供码跨域操作(CORS)，否则必会成功;
  http.open("GET", url, true); //异步调用
  http.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function () {
    let result = "";
    if (http.readyState == 4) {
      result = JSON.parse(http.responseText);
      result.Response === "True" ? showResult(result) : alert(result.Error);
    }
  };
  http.send(null);
};
const showResult = function (result) {
  let backImage = document.getElementById("back-img");
  backImage.src = result.Poster;

  let movImage = document.getElementById("mov-img");
  movImage.src = result.Poster;

  let title = document.getElementById("title");
  title.innerHTML = result.Title;

  let rated = document.getElementById("Rated");
  rated.innerHTML = result.Rated;

  let year = document.getElementById("Year");
  year.innerHTML = result.Year;

  let genre = document.getElementById("Genre");
  genre.innerHTML = result.Genre;

  let intraduse = document.getElementById("intraduce");
  intraduce.innerHTML = result.Plot;

  let writer = document.getElementById("writer");
  writer.innerHTML = "<strong>Writened By:</strong>" + result.Writer;

  let director = document.getElementById("director");
  director.innerHTML = "<strong>Directored By:</strong>" + result.Director;

  let starring = document.getElementById("starring");
  starring.innerHTML = "<strong>Starring:</strong>";

  let actor = document.getElementById("actor");
  actor.innerHTML = result.Actors;
};
