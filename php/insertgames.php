<?php
  // Allow from any origin
   header('Access-Control-Allow-Origin: *');
  echo "WE MADE IT";
  $servername = "localhost";
  $username = "root";
  $password = "DIAMONDjozu17";
  $conn =  mysql_connect($servername,$username, $password);
   $database = mysql_select_db("test", $conn);
   print_r($_POST);

  $name = $_POST['name'];
  $age  = $_POST['age'];
  // $image =$_POST['image'];
  // $deck=$_POST['deck'];
 //  $platform=$_POST['platform'];
 //  $genre="";
 //  $releaseDate="";
 //  $howLong="";
  //Insert the query

   if (mysql_query("INSERT INTO user VALUES('$name', '$age')")
   	){
   	   echo 'FORM COMPLETED YO, CHECK THE DATABASE'; 
   }else{
   	echo 'FAILED';
   }





// //$oneRecord = 
// //VALUES('')";


  mysql_close();

?>

