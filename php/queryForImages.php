<?php
header('Access-Control-Allow-Origin: *');

//echo "The POST WORKED!";
$servername = "localhost";
$username = "root";
$password = "DIAMONDjozu17";
$dbname  = "igdb";
$conn = new mysqli($servername, $username, $password, $dbname);
$randomGameRows = "SELECT cover FROM games2 ORDER BY RAND() LIMIT 100";
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