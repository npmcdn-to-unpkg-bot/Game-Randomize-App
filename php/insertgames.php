<?php
  // Allow from any origin



   header('Access-Control-Allow-Origin: *');
  echo "WE MADE IT";
  $servername = "localhost";
  $username = "root";
  $password = "DIAMONDjozu17";
  $dbname = "igdb";
  //$con=("localhost","my_user","my_password","my_db");
$conn =  new mysqli($servername,$username, $password, $dbname);
 // $conn =  mysql_connect($servername,$username, $password);
if(!$conn){
	die('Could not connect: ' . mysql_error());
}

 //  $database = mysql_select_db("igdb", $conn);
   print_r($_POST);
	//genre is an array that goes into a separate  table
  // releasedate and platoform indexes go into another table but in one row.
   $genreQuery = "";
   $releaseQuery = "";
   $name = $_POST['name'];
   //$nameEscaped = mysqli_real_escape_string($conn, $name); 
   $id =$_POST['id'];
   $genre_id =$_POST['id'];
   $release_info_id =$_POST['id'];
   $cover=$_POST['cover'];
   $summary=$_POST['summary'];
   //$summaryEscaped = mysqli_real_escape_string($conn,$summary); 
   $time_to_beat=$_POST['howLong'];
   $rating = $_POST['rating'];
   $url= $_POST['url'];
 //$finalName = mb_convert_encoding($name, "HTML-ENTITIES", "UTF-8");
  //$finalSummary = mb_convert_encoding($summary, "HTML-ENTITIES", "UTF-8");



//Include the id of the game in each

   $rawGenre= $_POST['genre'];
   $genreLength = count($rawGenre);
//   $genreTablesql = "CREATE TABLE genres( ";
   $genreInsertsql  = [];
   for ($i = 0; $i < $genreLength; $i++) {
     		//$genreTablesql = $genreTablesql . " \n genre_name text";
     		//Not about to end put another comma
     		//if($i != $genreLength-1){
     		//	$genreTablesql = $genreTablesql . "," ;
     		//}
     			$genreInsertsql[$i] = " \n INSERT INTO genres (genre_id,genre_name)  VALUES( " .$id. "," .  "'". $rawGenre[$i] . "'"  . ");";
     			 echo $genreInsertsql[$i] . "\n"; 
 		   if(mysqli_query($conn, $genreInsertsql[$i]) ===FALSE){
 		   		('could not enter data: ' .mysql_error());
 		   }else{
 		echo "data INSERTED DAWG3" . "\n";
 	}

}
 //$genreTablesql = $genreTablesql. ")";
 ////echo  $genreTablesql."\n\n" ;


 $rawReleaseDate= $_POST['releaseDate'];
 //Would this two never not be equal
 //yea maybe
 $rawPlatforms= $_POST['platform'];
 $largestLength; 
 if(count($rawReleaseDate) > count($rawPlatforms)){
 		$largestLength = count($rawReleaseDate);
 }else{
 		$largestLength = count($rawPlatforms);
 }

 //$releaseInfoTableSql = "CREATE TABLE release_info( ";
 $releaseInsertDataArray = [];
 //if(!empty($))
    for ($i = 0; $i < $largestLength; $i++) {
     		// $releaseInfoTableSql = $releaseInfoTableSql . " \n platform_name text, " . 
     		// " \n release_date text";
     		// //Not about to end put another comma
     		// if($i != $largestLength-1){
     		// 	$releaseInfoTableSql = $releaseInfoTableSql . "," ;
     		// }
     		$releaseInsertDataArray[$i] = " \n INSERT INTO release_info(release_id, platform_name, release_date)  VALUES( " . 
     		$id . "," . 
     		"'" .$rawPlatforms[$i] . "'"  . "," . 
     	 "'" . $rawReleaseDate[$i] . "'".  ");";
     		echo $releaseInsertDataArray[$i]  . "\n";
     		//$releaseQuery.= $releaseInsertDataArray[$i];
     		     if(mysqli_query($conn, $releaseInsertDataArray[$i]) ===FALSE){
 		   		('could not enter data: ' .mysql_error());
 		   }else{
 		echo "data INSERTED DAWG3" . "\n";
 	}


}

//$releaseInfoTableSql = $releaseInfoTableSql. ")";
//echo $releaseInfoTableSql . "\n";
 
    $query = "INSERT INTO games2(name,id,cover,summary,platforms,genres,release_date,time_to_beat,rating,url)
    VALUES('$name','$id','$cover','$summary','$release_info_id',
    '$genre_id','$release_info_id','$time_to_beat','$rating','$url')";

      if(mysqli_query($conn, $query) ===FALSE){
 		   		('could not enter data: ' .mysql_error());
 		   }else{
 		echo "data INSERTED DAWG3" . "\n";
 	}
   $conn->close();
?>

