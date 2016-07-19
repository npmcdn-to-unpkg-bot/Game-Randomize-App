<?php
  // Allow from any origin
   header('Access-Control-Allow-Origin: *');
  echo "WE MADE IT";
  $servername = "localhost";
  $username = "root";
  $password = "DIAMONDjozu17";
  $dbname  = "igdb";
//   $conn =  mysql_connect($servername,$username, $password);
// if(!$conn){
// 	die('Could not connect: ' . mysql_error());
// }
//    $database = mysql_select_db("igdb", $conn);
  $conn = new mysqli($servername, $username, $password, $dbname);
   print_r($_POST);

 $platforms;
 $genres;
 $scores;
 $times;
 $ratings;
//Start formating all the data 
   if(!(empty($_POST['platformArray']))){
    $platforms = $_POST['platformArray'];
    echo $platforms[0];
   }
   if(!(empty($_POST['genreArray']))){
    $genres = $_POST['genreArray'];
    echo $genres[0];
   }
  if(!(empty($_POST['scoreArray']))){
    $scores = $_POST['scoreArray'];
    echo $scores[0];
   }
if(!(empty($_POST['timeArray']))){
    $times = $_POST['timeArray'];
    echo $times[0];
   }
if(!(empty($_POST['yearArray']))){
    $ratings = $_POST['yearArray'];
    echo $ratings[0];
   }

$sql = "SELECT platforms from games";
$result = $conn->query($sql);
 

if($result->num_rows > 0){
    


} else {
    echo "0 results";
}




?>