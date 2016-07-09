<?php
  // Allow from any origin
   header('Access-Control-Allow-Origin: *');
  echo "WE MADE IT";
  $servername = "localhost";
  $username = "root";
  $password = "DIAMONDjozu17";
  $conn =  mysql_connect($servername,$username, $password);
if(!$conn){
	die('Could not connect: ' . mysql_error());
}

   $database = mysql_select_db("game_db", $conn);
   print_r($_POST);

  $name = $_POST['name'];
  //$age  = $_POST['age'];
   $image =$_POST['image'];
   $deck=$_POST['deck'];
 //  $deck = "TESTING DECK";
   $platform=$_POST['platform'];
   $genre= "";
   $releaseDate=$_POST['originalRelease'];
   $howLong="";
  //Insert the query
  $query = "INSERT INTO games(name,image,deck,platform,genre,ReleaseDate,howLong)
  VALUES('$name','$image','$deck','$platform',
  '$genre','$releaseDate','$howLong')";



  $retval = mysql_query($query, $conn);

  if(!$retval){
  	die('could not enter data: ' .mysql_error());
  }
echo "data INSERTED DAWG";



   // if (mysql_query("INSERT INTO games VALUES('$name',DEFAULT ,'$image', '$deck', '$platform' , '$genre' , '$releaseDate' , '$howLong')")
   // 	){
   // 	   echo 'FORM COMPLETED YO, CHECK THE DATABASE'; 
   // }else{
   // 	echo 'FAILED';
   // }





// //$oneRecord = 
// //VALUES('')";


  mysql_close($conn);

?>

