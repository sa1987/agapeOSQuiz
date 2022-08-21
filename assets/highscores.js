const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//clear list
var clearScoreButton = document.getElementById("clear-btn");

// highScoresList.innerHTML = highScores
//   .map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`;
//   })
//   .join("");


//   function displayMovies(highScores){
//     let table = '<table>';
//     table += '<tr><th>Name</th><th>Score</th></tr>';
//     movies.map((movie, index) => {
//         table = table + '<tr>',
//         table = table + '<td>' + 'Name:' + `${score.name}` + '</td>',
//         table = table + '<td>' + 'Name:' + `${score.score}` + '</td>'
//      });  
//      table += "</table>"
//      document.getElementById("movies-list").innerHTML = table;
//  }
 
//  highScoresList.innerHTML = displayMovies(movies);


 const displayHighscores = () => {
  let table = '<table border="1">';
  table += '<tr><th>ID</th><th>Score</th></tr>';
  highScores.forEach((highScores) => {
    table += `<tr>
                <td>${highScores.name}</td>
                <td>${highScores.score}</td>
              </tr>`;
  });
//  console.log(table); 
  table += '</table>';
  document.getElementById('highScoresList').innerHTML = table;
};

displayHighscores();
//highScoresList.innerHTML = displayMovies(highScores);
 
// Clear localStorage items 
clearScoreButton.addEventListener("click", function () {
  localStorage.clear();
  document.getElementById("highScoresList").innerHTML = "";
});