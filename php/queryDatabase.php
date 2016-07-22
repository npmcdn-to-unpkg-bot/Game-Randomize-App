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



function checkEmpty()
{
  if(empty($scores) && empty($times) && empty($years) && empty($))
    
    return $retval;
}




 $platforms;
 $genres;
 $scores;
 $times;
 $years;


//Start formating all the data 
   if(!(empty($_POST['platformArray']))){
    $platforms = $_POST['platformArray'];
    //echo $platforms[0];
   }
   if(!(empty($_POST['genreArray']))){
    $genres = $_POST['genreArray'];
   // echo $genres[0];
   }
  if(!(empty($_POST['scoreArray']))){
    $scores = $_POST['scoreArray'];
    //echo $scores[0];
   }
if(!(empty($_POST['timeArray']))){
    $times = $_POST['timeArray'];
    //echo $times[0];
   }
if(!(empty($_POST['yearArray']))){
    $years = $_POST['yearArray'];
    //echo $ratings[0];
   }

//Query to search the release info table to get the platforms. 

$releaseInfoQuery = []; 

/*
There are 4 possiblities
1.  platforms and years choosen 
2. platforms but no years X
3. years but no platforms  X
4. no platforms and no years. X
*/

//Platform for loop
if(!empty($platforms) && empty($years)){
      $lengthPlatforms = count($platforms);
      for ($i = 0; $i < $lengthPlatforms; $i++) {
           $releaseInfoQuery[$i] .= "SELECT release_id,platform_name, release_date FROM release_info WHERE( " .
         "platform_name = ". "'". $platforms[$i]."'" ;
         //Append the ending.
         // if(empty($years)){
            $releaseInfoQuery[$i] .= ");";
          //}
         echo $releaseInfoQuery[$i] . "\n";
    }
} else if(!empty($platforms) && !empty($years)){
      $lengthPlatforms = count($platforms);
      $lengthYears  = count($years);
      for ($i = 0; $i < $lengthPlatforms; $i++) {
           $releaseInfoQuery[$i] .= "SELECT release_id,platform_name, release_date FROM release_info WHERE( " ;
           for($j=0 ; $j < $lengthYears; $j++){
              $releaseInfoQuery[$i] .=   "platform_name = ". "'". $platforms[$i]."'" ;                      
                $releaseInfoQuery[$i] .=   " AND release_date LIKE ". "'%". $years[$j]."%')" ;
                //End it
                if($j == $lengthYears-1){
                    $releaseInfoQuery[$i].= ";";
                }else{
                  $releaseInfoQuery[$i].= " OR ( ";
                }
              }
         echo $releaseInfoQuery[$i] . "\n";
    }
}else if( !empty($years) && empty($platforms)){
  echo "WE IN THE YEARS LOOP";
      $lengthYears  = count($years);
        for ($i = 0; $i < $lengthYears; $i++) {
            echo "ENTERING THE YEARS FOR LOOP \n\n";
            // if(!empty($releaseInfoQuery) && !empty($platforms)){
            //   for($j=0 ; $j < $lengthPlatforms; $j++){
            //     $startOfString = $releaseInfoQuery[$i];
            //   echo "ENTERING THE J  FOR LOOP IN YEARS \n\n";
            //     $releaseInfoQuery[$j] .=  "," . " AND release_date LIKE ". "'%". $years[$i]."%')" .  "OR( " ;
            //     echo $releaseInfoQuery[$j] . "\n\n";
            //   }
            // }else{
                   //there are no plaforms selected
                  $releaseInfoQuery[$i] .= "SELECT release_id,platform_name, release_date FROM release_info WHERE " .
                  "release_date LIKE ". "'%". $years[$i]."%'" . ";";
                   echo $releaseInfoQuery[$i] . "\n\n";
            }
}




//What IF NOTHING IS FOUUND FOR THE YEARS AND PLATFORM... THEN THE IDS ARE EMPTY AND GENRE STILL INITIATES. 
$listOfSelectedIds = []; 
$finalListSelectedIds = [];
if(!empty($releaseInfoQuery)){    
  $length = count($releaseInfoQuery);
  for($i  = 0  ; $i<$length;$i++){
    echo "CALLING THE CONNECTION \n";
      $result = $conn->query($releaseInfoQuery[$i]);
      if($result->num_rows > 0 ){
              //Out put the data, put each of the ids in a array.
              while($row = $result->fetch_assoc()){
              echo "id: " . $row["release_id"]. " - Plat Name: " . $row["platform_name"]. "  Date" . $row["release_date"]. "<br> \n";
              //Don't put in if repeated
                  if(!in_array($row["release_id"], $listOfSelectedIds)){
                      array_push($listOfSelectedIds, $row['release_id']);
                      //echo $listOfSelectedIds[$i] . "!!!!!!!!!!!!! \n";
                  }
              } 
         }else{
            echo "No results, sorry \n";
             }
       }  
 }

    //Then create query to just search for genres. There were no platforms etc....
 //HOW ABOUT ONES WITH NO YEAR/RELEASE;


 $genreQueryStatement = [] ; 
if(empty($listOfSelectedIds) && !empty($genres)){
    $genreLength = count($genres);
    for($i=0;$i<$genreLength; $i++){
          $genreQueryStatement[$i] .= "SELECT genre_id,genre_name FROM genres WHERE " . "genre_name= " . "'" . $genres[$i]  ."'";
          echo  $genreQueryStatement[$i] . "\n";
          //Should I also query the database? //Add the ids.
          $result = $conn->query($genreQueryStatement[$i]);
           if($result->num_rows > 0 ){
                   while($row = $result->fetch_assoc()){
                          echo "Results Found for genre! \n";
                           echo "id: " . $row["genre_id"]. " - Genre Name: " . $row["genre_name"]. "<br>" ."\n";
                            if(!in_array($row["genre_id"], $listOfSelectedIds)){
                                array_push($listOfSelectedIds, $row['genre_id']);
                            }
                      } 
           }else{
            echo "No results, sorry \n";
           }
    }
}else if(!empty($listOfSelectedIds) && !empty($genres)){
      $idLegnth = count($listOfSelectedIds);
      $genreLength = count($genres);
        for($i=0;$i<$idLegnth; $i++){
           $genreQueryStatement[$i] .=  "SELECT genre_id,genre_name FROM genres WHERE( ";
          for($j = 0 ; $j<$genreLength;$j++){
             $genreQueryStatement[$i] .= "genre_id= ". "'".$listOfSelectedIds[$i] ."'" . " AND genre_name =". "'" . $genres[$j] ."')";
             echo $genreQueryStatement[$i] . "\n" . "j = "  . $j  ;
             //ending
               if($j == $genreLength-1){
                    $genreQueryStatement[$i].= ";";
                }else{
                  $genreQueryStatement[$i].= " OR ( ";
                }
          }
         $result = $conn->query($genreQueryStatement[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                          echo "Results Found for genre with the mathcing id! \n";
                           echo "id: " . $row["genre_id"]. " - Genre Name: " . $row["genre_name"]. "<br>" ."\n";
                            if(!in_array($row["genre_id"], $finalListSelectedIds)){
                                array_push($finalListSelectedIds, $row['genre_id']);
                          }
               } 
          }
    }
 }

/*
Possibilities
1. Use the above release_date info to get out all the ids of the selected games and query those. X
3. If there is no genre skip X
*/

//Array finalIds will not be empty if platform year and genre is choose or
if(!empty($finalListSelectedIds)){
  //copy it to listIDS overwrite it, else just use the values in it.
  $listOfSelectedIds = $finalListSelectedIds;
}


//Query the time to beat, there will a boolean switch to determine if the use wants to include games with no data in this field.

//There are times, but nothing else
//CHANGE TIMES TO JUST HRS....
$timeSelectQuery = [];
$secondaryArray = [] ;
if(!empty($times) && empty($listOfSelectedIds)){
    $timeLength = count($times);
    for($i= 0 ; $i<$timeLength ; $i++){
             //Split into 2 substrings split by " "
             $spaceIndex = strpos($times[$i], " "); 
             $lastIndex =  strlen($times[$i]); 
            $secondValue =   substr($times[$i], $spaceIndex);
            $firstValue =  substr($times[$i],0,$spaceIndex);
            $timeSelectQuery[$i] .= "SELECT id,time_to_beat FROM games2 WHERE( ";
            $timeSelectQuery[$i] .= "time_to_beat BETWEEN " .  $firstValue . " AND " . $secondValue . ")";
            //echo $timeSelectQuery[$i] . "\n\n";
            //Down here will be a boolean to see if they want to include games without data
            $result = $conn->query($timeSelectQuery[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                          echo "Results Found for time \n";
                           echo "id: " . $row["id"]. " - time to beat:  " . $row["time_to_beat"]. "<br>" ."\n";
                            if(!in_array($row["id"], $listOfSelectedIds)){
                                array_push($listOfSelectedIds, $row['id']);
                          }
               } 
          }
    }
}else if(!empty($times) && !empty($listOfSelectedIds)){
    //There is a year or platform choose and need to search that with the time.
      $timeLength = count($times);
      $length = count($listOfSelectedIds);
      for($i= 0 ; $i<$length ; $i++){
             //Split into 2 substrings split by " "
              $timeSelectQuery[$i] .= "SELECT id,time_to_beat FROM games2 WHERE( ";
            for($j = 0 ; $j<$timeLength;$j++){
               $spaceIndex = strpos($times[$j], " "); 
               $lastIndex =  strlen($times[$j]); 
               $secondValue =  substr($times[$j], $spaceIndex);
               $firstValue =  substr($times[$j],0,$spaceIndex);
              // echo "First value: " . $firstValue . " Second value " . $secondValue . "\n\n";
                  $timeSelectQuery[$i] .= "time_to_beat BETWEEN " .  $firstValue . " AND " . $secondValue . " AND ";
                  $timeSelectQuery[$i].= "id= " . $listOfSelectedIds[$i] . ")";
                   if($j == $timeLength-1){
                    $timeSelectQuery[$i].= ";";
                }else{
                  $timeSelectQuery[$i].= " OR ( ";
                }
                //Down here will be a boolean to see if they want to include games without data
            $result = $conn->query($timeSelectQuery[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                          echo "Results Found for time with selected ids! \n";
                           echo "id: " . $row["id"]. " - time to beat:  " . $row["time_to_beat"]. "<br>" ."\n";
                            if(!in_array($row["id"], $secondaryArray)){
                                array_push($secondaryArray, $row['id']);
                          }
               } 
          }else{
            echo "Sorry no results found for this query! \n";
          }
            } //End of j    
            echo $timeSelectQuery[$i] . "\n";        
          }        
          //Copy the array
          if(!empty($secondaryArray)){
           //copy it to listIDS overwrite it, else just use the values in it.
           $listOfSelectedIds = $secondaryArray;
          }
}

$scoresSelectQuery = [];
$ratingSelectQuery = [];
$secondaryArray = [] ;
//Just query the ratings. 
if(!empty($scores) && empty($listOfSelectedIds)){  
    $scoresLength = count($scores);
    for($i= 0 ; $i<$scoresLength ; $i++){
            $spaceIndex = strpos($scores[$i], " "); 
              $lastIndex =  strlen($scores[$i]); 
            $secondValue =   substr($scores[$i], $spaceIndex);
            $firstValue =  substr($scores[$i],0,$spaceIndex);
            $scoresSelectQuery[$i] .= "SELECT id,rating FROM games2 WHERE( ";
            $scoresSelectQuery[$i] .= "rating BETWEEN " .  $firstValue . " AND " . $secondValue . ")";
            //Down here will be a boolean to see if they want to include games without data
            $result = $conn->query($scoresSelectQuery[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                          echo "Results Found for time \n";
                           echo "id: " . $row["id"]. " - rating:  " . $row["rating"]. "<br>" ."\n";
                            if(!in_array($row["id"], $listOfSelectedIds)){
                                array_push($listOfSelectedIds, $row['id']);
                          }
               } 
          }else{
            echo "Sorry no games with this rating range found \n";
          }
            echo $scoresSelectQuery[$i] . "\n";  
    }

}else if(!empty($scores) && !empty($listOfSelectedIds)){
    //There is a year or platform choose and need to search that with the time.
      $scoresLength = count($scores);
      $length = count($listOfSelectedIds);
      for($i= 0 ; $i<$length ; $i++){
             //Split into 2 substrings split by " "
              $scoresSelectQuery[$i] .= "SELECT id,rating FROM games2 WHERE( ";
            for($j = 0 ; $j<$scoresLength;$j++){
               $spaceIndex = strpos($scores[$j], " "); 
               $lastIndex =  strlen($scores[$j]); 
               $secondValue =  substr($scores[$j], $spaceIndex);
               $firstValue =  substr($scores[$j],0,$spaceIndex);
                $scoresSelectQuery[$i] .= "rating BETWEEN " .  $firstValue . " AND " . $secondValue . " AND ";
                $scoresSelectQuery[$i].= "id= " . $listOfSelectedIds[$i] . ")";
                   if($j == $scoresLength-1){
                    $scoresSelectQuery[$i].= ";";
                }else{
                  $scoresSelectQuery[$i].= " OR ( ";
                }
                //Down here will be a boolean to see if they want to include games without data
            $result = $conn->query($scoresSelectQuery[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                          echo "Results Found for time with selected ids! \n";
                           echo "id: " . $row["id"]. " - rating:  " . $row["rating"]. "<br>" ."\n";
                            if(!in_array($row["id"], $secondaryArray)){
                                array_push($secondaryArray, $row['id']);
                          }
               } 
          }else{
            echo "Sorry no results found for this query! \n";
          }
            } //End of j    
            echo $scoresSelectQuery[$i] . "\n";        
          }        
          //Copy the array
          if(!empty($secondaryArray)){
           //copy it to listIDS overwrite it, else just use the values in it.
           $listOfSelectedIds = $secondaryArray;
          }
}

//FINALLY listOfSelectedIds should have all the games needed;

//They don't want to have any criteria, and it selects from all games.

if(empty($platforms) && empty($genres) && empty($scores) && empty($times) && empty($ratings) && empty($years)){
//Pick a random row from the entire table
// $allRows = "SELECT COUNT(*) FROM games2";
// $result = $conn->query($allRows);
//             if($result->num_rows > 0 ){
//              while($row = $result->fetch_assoc()){
//                         echo "Number of rows:  " . $row["id"]. " - time to beat:  " . $row["time_to_beat"]. "<br>" ."\n";
//               } 
//          }else{
//            echo "Sorry no results found for this query! \n";
//          }
}else if((empty($listOfSelectedIds)&&!empty($platforms)) ||(empty($listOfSelectedIds)&&!empty($genres)) ||(empty($listOfSelectedIds)&&!empty($scores)) ||
(empty($listOfSelectedIds)&&!empty($times)) ||(empty($listOfSelectedIds)&&!empty($ratings)) ||(empty($listOfSelectedIds)&&!empty($years))
){
  echo "SORRY NO RESULTS FOUND FOR THESE CRITERIA, TRY AGAIN!!! \n\n" ;
}else{
  //There was something selected found
  $length  = count($listOfSelectedIds);
  for($i = 0 ; $i<$length; $i++){
    echo "Final selected ID is: " . $listOfSelectedIds[$i] . "\n\n";
  }


}





   $conn->close();
?>
