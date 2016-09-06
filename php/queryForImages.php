<?php
header('Access-Control-Allow-Origin: *');

//echo "The POST WORKED!";
$servername = "localhost";
$username = "root";
$password = "DIAMONDjozu17";
$dbname  = "giant_bomb";
$conn = new mysqli($servername, $username, $password, $dbname);
$randomGameRows = "SELECT cover FROM giant_bomb_games WHERE `cover` IS NOT NULL ORDER BY RAND() LIMIT 30";
$result = $conn->query($randomGameRows);
$imageArray= [];
if($result->num_rows > 0){
         while($row = $result->fetch_assoc()){
         	array_push($imageArray, $row["cover"]);
         }
        // echo var_dump($imageArray);
        echo json_encode($imageArray);
}else{
	//echo "There where no results for the random Query!";
}





$conn->close();


  ?>