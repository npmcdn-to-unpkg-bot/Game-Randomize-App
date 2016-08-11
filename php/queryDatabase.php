<?php
  // Allow from any origin
   header('Access-Control-Allow-Origin: *');
 // echo "WE MADE IT";
  $servername = "localhost";
  $username = "root";
  $password = "DIAMONDjozu17";
  $dbname  = "giant_bomb";

//IF PLATFORM AND YEAR DON'T EXIST,THEN NOTHING ELSE DOES.Inidate that with a boolean
$platform_year_found;                  

error_reporting(0);
//   $conn =  mysql_connect($servername,$username, $password);
// if(!$conn){
// 	die('Could not connect: ' . mysql_error());
// }
//    $database = mysql_select_db("igdb", $conn);
  $conn = new mysqli($servername, $username, $password, $dbname);
   //print_r($_POST);



// function checkEmpty()
// {
//   if(empty($scores) && empty($times) && empty($years) && empty($))
    
//     return $retval;
// }




 $platforms;
 $genres;
 $scores;
 $times;
 $years;

 $includeEmptyTimes='true';
 $includeEmptyScores='true';


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

   if(!(empty($_POST['yearArray']))){
    $years = $_POST['yearArray'];
    //echo $ratings[0];
   }





if($includeEmptyTimes && !empty($times)){
  //If the boolean is true add all time="" to $times array
  array_push($times, "");
  // echo "Included blank time in the array \n";
  // echo var_dump($times) . "\n";
}



if($includeEmptyScores && !empty($scores)){
  //If the boolean is true add all rating="" to $scores array
  array_push($scores, "");
    // echo "Included blank rating in the array \n";
    //   echo var_dump($scores) . "\n";
}


//Query to search the release info table to get the platforms. 

$releaseInfoQuery = []; 
$platformQuery=[];
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
           $releaseInfoQuery[$i] .= "SELECT platform_id,platform_name FROM platforms WHERE( " .
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
         // echo $releaseInfoQuery[$i] . "\n";
    }
}else if( !empty($years) && empty($platforms)){
  // echo "WE IN THE YEARS LOOP";
      $lengthYears  = count($years);
        for ($i = 0; $i < $lengthYears; $i++) {
            // echo "ENTERING THE YEARS FOR LOOP \n\n";
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
                   // echo $releaseInfoQuery[$i] . "\n\n";
            }
}




//What IF NOTHING IS FOUUND FOR THE YEARS AND PLATFORM... THEN THE IDS ARE EMPTY AND GENRE STILL INITIATES. 
$listOfSelectedIds = []; 
$finalListSelectedIds = [];
if(!empty($releaseInfoQuery)){    
  $length = count($releaseInfoQuery);
  for($i  = 0  ; $i<$length;$i++){
    // echo "CALLING THE CONNECTION \n";
      $result = $conn->query($releaseInfoQuery[$i]);
      if($result->num_rows > 0 ){
              //Out put the data, put each of the ids in a array.
              while($row = $result->fetch_assoc()){
              // echo "id: " . $row["release_id"]. " - Plat Name: " . $row["platform_name"]. "  Date" . $row["release_date"]. "<br> \n";
              //Don't put in if repeated
                  if(!in_array($row["release_id"], $listOfSelectedIds)){
                      array_push($listOfSelectedIds, $row['release_id']);
                      $platform_year_found = 'true' ;                  
                    }
              } 
         }else{
            // echo "No results, sorry \n";
           $platform_year_found = 'false';                  

             }
       }  
 }

    //Then create query to just search for genres. There were no platforms etc....
 //HOW ABOUT ONES WITH NO YEAR/RELEASE;


 $genreQueryStatement = [] ; 
  //If the platform and year returned nothing, and there 
//for the boolean if true there are platforms and years, then you need to do the else if, if false... then it shouldn't run.
 //It should only run if there was only thing choosen. 
 // platform_year_found  is basically checking if the user choose any platforms or years. 

//echo "YO PLATFROM_YEAR_FOUND IS......  " .  $platform_year_found . "\n\n\n";

if(empty($listOfSelectedIds) && !empty($genres) &&empty($platform_year_found)){
    $genreLength = count($genres);
    for($i=0;$i<$genreLength; $i++){
          $genreQueryStatement[$i] .= "SELECT genre_id,genre_name FROM genres WHERE " . "genre_name= " . "'" . $genres[$i]  ."'";
          // echo  $genreQueryStatement[$i] . "\n";
          //Should I also query the database? //Add the ids.
          $result = $conn->query($genreQueryStatement[$i]);
           if($result->num_rows > 0 ){
                   while($row = $result->fetch_assoc()){
                          // echo "Results Found for genre! \n";
                          //  echo "id: " . $row["genre_id"]. " - Genre Name: " . $row["genre_name"]. "<br>" ."\n";
                            if(!in_array($row["genre_id"], $listOfSelectedIds)){
                                array_push($listOfSelectedIds, $row['genre_id']);
                            }
                      } 
           }else{
            // echo "No results, sorry \n";
           }
    }
}else if(!empty($listOfSelectedIds) && !empty($genres)){
      $idLegnth = count($listOfSelectedIds);
      $genreLength = count($genres);
        for($i=0;$i<$idLegnth; $i++){
           $genreQueryStatement[$i] .=  "SELECT genre_id,genre_name FROM genres WHERE( ";
          for($j = 0 ; $j<$genreLength;$j++){
             $genreQueryStatement[$i] .= "genre_id= ". "'".$listOfSelectedIds[$i] ."'" . " AND genre_name =". "'" . $genres[$j] ."')";
             // echo $genreQueryStatement[$i] . "\n" . "j = "  . $j  ;
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
                          // echo "Results Found for genre with the mathcing id! \n";
                          //  echo "id: " . $row["genre_id"]. " - Genre Name: " . $row["genre_name"]. "<br>" ."\n";
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
              //Unless the index is empty, then don't split it.
            if($times[$i]!=""){
                   $spaceIndex = strpos($times[$i], " "); 
                   $lastIndex =  strlen($times[$i]); 
                   $secondValue =   substr($times[$i], $spaceIndex);
                   $firstValue =  substr($times[$i],0,$spaceIndex);
          }else{
            // echo "IN THE BLANK STRING SETTINGS FOR TIME \n";
              $firstValue = 0;
              $secondValue=0;
          }
            $timeSelectQuery[$i] .= "SELECT id,time_to_beat FROM games2 WHERE( ";
            $timeSelectQuery[$i] .= "time_to_beat BETWEEN " .  $firstValue . " AND " . $secondValue . ")";
            // echo $timeSelectQuery[$i] . "\n\n";
            //Down here will be a boolean to see if they want to include games without data
            $result = $conn->query($timeSelectQuery[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                          // echo "Results Found for time \n";
                          //  echo "id: " . $row["id"]. " - time to beat:  " . $row["time_to_beat"]. "<br>" ."\n";
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
              if($times[$j]!=""){
               $spaceIndex = strpos($times[$j], " "); 
               $lastIndex =  strlen($times[$j]); 
               $secondValue =  substr($times[$j], $spaceIndex);
               $firstValue =  substr($times[$j],0,$spaceIndex);
             }else{
              // echo "In the empty time setting with genre/platform/year found \n";
              $firstValue = 0;
              $secondValue= 0;
             }
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
                          // echo "Results Found for time with selected ids! \n";
                          //  echo "id: " . $row["id"]. " - time to beat:  " . $row["time_to_beat"]. "<br>" ."\n";
                            if(!in_array($row["id"], $secondaryArray)){
                                array_push($secondaryArray, $row['id']);
                          }
               } 
          }else{
            // echo "Sorry no results found for this query! \n";
          }
            } //End of j    
            // echo $timeSelectQuery[$i] . "\n";        
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
      if($scores[$i]!=""){
            $spaceIndex = strpos($scores[$i], " "); 
            $lastIndex =  strlen($scores[$i]); 
            $secondValue =   substr($scores[$i], $spaceIndex);
            $firstValue =  substr($scores[$i],0,$spaceIndex);
          }else{
            // echo "In rating settings for NO Rating games. \n";
            $firstValue=0;
            $secondValue=0;
          }
            $scoresSelectQuery[$i] .= "SELECT id,rating FROM games2 WHERE( ";
            $scoresSelectQuery[$i] .= "rating BETWEEN " .  $firstValue . " AND " . $secondValue . ")";

            //Down here will be a boolean to see if they want to include games without data
            $result = $conn->query($scoresSelectQuery[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                          // echo "Results Found for time \n";
                          //  echo "id: " . $row["id"]. " - rating:  " . $row["rating"]. "<br>" ."\n";
                            if(!in_array($row["id"], $listOfSelectedIds)){
                                array_push($listOfSelectedIds, $row['id']);
                          }
               } 
          }else{
            // echo "Sorry no games with this rating range found \n";
          }
            // echo $scoresSelectQuery[$i] . "\n";  
    }

}else if(!empty($scores) && !empty($listOfSelectedIds)){
    //There is a year or platform choose and need to search that with the time.
      $scoresLength = count($scores);
      $length = count($listOfSelectedIds);
      for($i= 0 ; $i<$length ; $i++){
             //Split into 2 substrings split by " "
              $scoresSelectQuery[$i] .= "SELECT id,rating FROM games2 WHERE( ";
            for($j = 0 ; $j<$scoresLength;$j++){
              if($scores[$j]!=""){
               $spaceIndex = strpos($scores[$j], " "); 
               $lastIndex =  strlen($scores[$j]); 
               $secondValue =  substr($scores[$j], $spaceIndex);
               $firstValue =  substr($scores[$j],0,$spaceIndex);
             }else{
              // echo "In the empty rating settings where there is a genre/platform/year chosen \n";
              $firstValue=0; 
              $secondValue=0; 
             }
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
                          // echo "Results Found for time with selected ids! \n";
                          //  echo "id: " . $row["id"]. " - rating:  " . $row["rating"]. "<br>" ."\n";
                            if(!in_array($row["id"], $secondaryArray)){
                                array_push($secondaryArray, $row['id']);
                          }
               } 
          }else{
            // echo "Sorry no results found for this query! \n";
          }
            } //End of j    
            // echo $scoresSelectQuery[$i] . "\n";        
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
  // echo " No preferences choosen, selecting game at random. \n";
$randomRowGames = "SELECT * FROM giant_bomb_games ORDER BY RAND() LIMIT 1";
$result = $conn->query($randomRowGames);
$chosenID; 
$gameArray;
$contentArray =[];
  if($result->num_rows > 0){
         while($row = $result->fetch_assoc()){
                        // echo  "Name: " . $row["name"]. "  id:  " . $row["id"]. " cover url : " . $row["cover"] . "\n summary: "
                        // .$row["summary"] . " time_to_beat: " . $row['time_to_beat'] . " rating: " . $row[$rating] . " info url: " .
                        // $row["url"];
                        // "<br>" ."\n";
                         $chosenID = $row["id"];
                         $contentArray = [
                         'name'=> $row['name'],
                         'id'=>$row['id'],
                         'cover'=> $row['cover'],
                         'releaseDate'=>$row['release_data'],
                         'summary'=>$row['summary'],
                         'rating'=>$row['rating'],
                         'info'=> $row['url'],
                         ];
              }
          // echo "Choosen Id  is " . $chosenID . "\n";
             //for($i=0;$i<count($contentArray);$i++){
                    // echo "\n" .  var_dump($contentArray); 
                 // }
  }else{
           // echo "Sorry no results found for this query! \n";
    }
    if(!empty($chosenID)){
         //Find the release info and the genre stuff
        $randomGenreQuery= "SELECT * FROM genres WHERE genre_id=".$chosenID ;
        $randomReleaseData= "SELECT * FROM platforms WHERE platform_id =".$chosenID;
        $randomTimeToBeatQuery="SELECT * FROM time_to_beat_table WHERE id =".$chosenID;
        $result2 = $conn->query($randomGenreQuery);
        $result3 = $conn->query($randomReleaseData);
        $result4= $conn->query($randomTimeToBeatQuery);
        $genreArray=[];
        $finalPlatArray=[];
        $timeArray = [];
        if($result2->num_rows > 0 ){
            while($row = $result2->fetch_assoc()){
                        // echo "Genre name/s are : " . $row["genre_name"]; 
                        array_push($genreArray, $row["genre_name"]);
                  }
                    // echo "\n" .  var_dump($genreArray); 
                  $contentArray["genres"] = $genreArray;
         }else{ 
           // echo "Sorry no results found for this query! \n";
         }
            if($result3->num_rows > 0 ){
             while($row = $result3->fetch_assoc()){
                        // echo "Platform name:  " . $row["platform_name"] . " release date: " . $row["release_date"];
                        $data = $row["platform_name"];
                        array_push($finalPlatArray, $data);
              } 

               // echo "\n" .  var_dump($releaseInfoArray); 
                $contentArray["platforms"]=$finalPlatArray;
                  // echo "Echoing final contents of the ContentArray!" . "\n" ;
                 // echo var_dump($contentArray);
                  //Finallly send it in JSON FORMAT
                  //echo json_encode($contentArray);
         }else{
           // echo "Sorry no results found for this query! \n";
         }
         
      if($result4->num_rows > 0){
        while($row = $result4->fetch_assoc()){
           array_push($timeArray, $row["main_story"]);
           array_push($timeArray, $row["main_extras"]);
           array_push($timeArray, $row["completionist"]);
           array_push($timeArray, $row["combined"]);
        }
        $contentArray["time_to_beat"] = $timeArray;
      }
  }

  echo json_encode($contentArray);
}else if((empty($listOfSelectedIds)&&!empty($platforms)) ||(empty($listOfSelectedIds)&&!empty($genres)) ||(empty($listOfSelectedIds)&&!empty($scores)) ||
(empty($listOfSelectedIds)&&!empty($times)) ||(empty($listOfSelectedIds)&&!empty($ratings)) ||(empty($listOfSelectedIds)&&!empty($years))
){
  // echo "SORRY NO RESULTS FOUND FOR THESE CRITERIA, TRY AGAIN!!! \n\n" ;
}else{
  //There was something selected found
  $length  = count($listOfSelectedIds);
  for($i = 0 ; $i<$length; $i++){
    // echo "Final selected ID is: " . $listOfSelectedIds[$i] . "  index: " . $i . "\n\n" ;
  }
//Get the random the 
  // echo "Length of all the selected games " . $length . "\n";
 $randomIndex  = rand(0, ($length-1));
// echo "RANDOM INDEX CHOSEN IS " . $randomIndex . " with id ". $listOfSelectedIds[$randomIndex];
$randomQuery = "SELECT * FROM giant_bomb_games WHERE id=". $listOfSelectedIds[$randomIndex] ;
$randomGenreQuery= "SELECT * FROM genres WHERE genre_id=".$listOfSelectedIds[$randomIndex];
$randomPlatform= "SELECT * FROM platforms WHERE platform_id =".$listOfSelectedIds[$randomIndex];
$randomTime= "SELECT * FROM time_to_beat_table WHERE id =".$listOfSelectedIds[$randomIndex];
$result = $conn->query($randomQuery);
$result2 = $conn->query($randomGenreQuery);
$result3 = $conn->query($randomReleaseData);
$result4 = $conn->query($randomTime);
$contentArray =[];
$genreArray=[];
$platformArray=[];
$timeArray = [];


            if($result->num_rows > 0 ){
             while($row = $result->fetch_assoc()){
                        // echo  "Name: " . $row["name"]. "  id:  " . $row["id"]. " cover url : " . $row["cover"] . "\n summary: "
                        // .$row["summary"] . " time_to_beat: " . $row['time_to_beat'] . " rating: " . $row[$rating] . " info url: " .
                        // $row["url"];
                        // "<br>" ."\n";
                     // echo  "Name: " . $row["name"]. "  id:  " . $row["id"]. " cover url : " . $row["cover"] . "\n summary: "
                     //    .$row["summary"] . " time_to_beat: " . $row['time_to_beat'] . " rating: " . $row[$rating] . " info url: " .
                     //    $row["url"];
                     //    "<br>" ."\n";

                        $chosenID = $row["id"];
                         $contentArray = [
                         'name'=> $row['name'],
                         'id'=>$row['id'],
                         'cover'=> $row['cover'],
                         'releaseDate'=>$row['release_data'],
                         'summary'=>$row['summary'],
                         'rating'=>$row['rating'],
                         'info'=> $row['url'],
                         ];
              }
                  echo "\n" .  var_dump($contentArray); 
         }else{
            echo "Sorry no results found for this query! \n";
         }

          if($result2->num_rows > 0 ){
            while($row = $result2->fetch_assoc()){
                        // echo "Genre name/s are : " . $row["genre_name"]; 
                        array_push($genreArray, $row["genre_name"]);
                        }
                 echo "\n" .  var_dump($genreArray); 
                $contentArray["genres"] = $genreArray;
         }else{
            echo "Sorry no results found for this query! \n";
         }
            if($result3->num_rows > 0 ){
             while($row = $result3->fetch_assoc()){
                      // echo "Platform name:  " . $row["platform_name"] . " release date: " . $row["release_date"];
                      $data = $row["platform_name"];
                      array_push($releaseInfoArray, $data);
                }
                   echo "\n" .  var_dump($releaseInfoArray); 
                  $contentArray["platforms"]=$releaseInfoArray;
                  // echo "Echoing final contents of the ContentArray!" . "\n" ;
                  //Finallly send it in JSON FORMAT
                  //echo json_encode($contentArray);

         }else{
            echo "Sorry no results found for this query! \n";
         }

          if($result4->num_rows > 0){
        while($row = $result4->fetch_assoc()){
           array_push($timeArray, $row["main_story"]);
           array_push($timeArray, $row["main_extras"]);
           array_push($timeArray, $row["completionist"]);
           array_push($timeArray, $row["combined"]);
        }
        //$contentArray["time_to_beat"] = $timeArray;
         echo "\n" .  var_dump($releaseInfoArray); 
         $contentArray["platforms"]=$releaseInfoArray;
          echo "Echoing final contents of the ContentArray!" . "\n" ;
          echo var_dump($contentArray);

      }

    }
   $conn->close();
// }
?>
