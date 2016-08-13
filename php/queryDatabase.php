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
   print_r($_POST);



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

$plat_and_year_query = []; 
$platformQuery=[];
$yearQuery=[];

/*
There are 4 possiblities
1.  platforms and years choosen 
2. platforms but no years X
3. years but no platforms  X
4. no platforms and no years. X
*/

$listOfSelectedIds=[];

//Platform for loop
if(!empty($platforms) && empty($years)){
      $tempIdArray=[];
      $lengthPlatforms = count($platforms);
      for ($i = 0; $i < $lengthPlatforms; $i++) {
           $plat_and_year_query[$i] .= "SELECT platform_id,platform_name FROM platforms WHERE( " .
           "platform_name = ". "'". $platforms[$i]."'" ;         
            $plat_and_year_query[$i] .= ");";
            echo $plat_and_year_query[$i] . "\n";
           $result = $conn->query($plat_and_year_query[$i]);
          if($result->num_rows > 0 ){
            while($row = $result->fetch_assoc()){
              //echo "Row found with " . $row['platform_id'] . "\n";
              array_push($tempIdArray, $row['platform_id']);
            }
            echo(var_dump($tempIdArray));
          }else{
            echo "Searching for results in the platform year loop (platform part) failed \n";
          }
          $listOfSelectedIds = $tempIdArray;

    }
} else if(!empty($platforms) && !empty($years)){
    echo "In PLATFORMS AND YEARS HAVE VALUE LOOP \n";
      $tempIdArray=[];
      $lengthPlatforms = count($platforms);
      $lengthYears  = count($years);
      for ($i = 0; $i < $lengthPlatforms; $i++){
        echo "In platform for loop";
            //just get the ids from this for loop
           //$plat_and_year_query[$i] .= "SELECT platform_id,platform_name FROM platforms WHERE( " ;
          $temp_query2 = "SELECT platform_id,platform_name FROM platforms WHERE( " .
          "platform_name = ". "'". $platforms[$i]."')" ;
          echo $temp_query2 . "\n";
          $result = $conn->query($temp_query2);
          if($result->num_rows > 0 ){
            while($row = $result->fetch_assoc()){
              echo "Row found with id " + $row['platform_id'];  
              array_push($tempIdArray, $row['platform_id']);
            }
            echo(var_dump($tempIdArray));
          }else{
            echo "Searching for results in the platform year loop (platform part) failed \n";
          }
    }
     for ($i = 0; $i < $lengthYears; $i++){
            //compare against the other ids
          $temp_query .= "SELECT id FROM giant_bomb_games WHERE " .
          "release_data LIKE ". "'%". $years[$i]."%'" . ";";
          echo $temp_query[$i] . "\n";
          $result = $conn->query($temp_query);
          if($result->num_rows > 0 ){
            while($row = $result->fetch_assoc()){
              if(in_array($row['id'], $tempIdArray)){
                  array_push($listOfSelectedIds, $row['id']);
                  echo ("Id matched, platform and year, inserting id: " . $row['id'] ."\n");
              }else{
                echo "ID: " . $row['id'] . " does not match year platform array \n";
              }
            }
            echo(var_dump($listOfSelectedIds));
          }else{
            echo "Searching for results in the platform year loop (platform part) failed";
          }
    }

}else if( !empty($years) && empty($platforms)){
   echo "WE IN THE YEARS LOOP";
      $lengthYears  = count($years);
        for ($i = 0; $i < $lengthYears; $i++) {
                  $yearQuery[$i] .= "SELECT id FROM giant_bomb_games WHERE " .
                  "release_data LIKE ". "'%". $years[$i]."%'" . ";";
                  echo $yearQuery[$i] . "\n\n";
                  $result = $conn->query($yearQuery[$i]);
                  if($result->num_rows > 0 ){
                    while($row = $result->fetch_assoc()){
                       array_push($listOfSelectedIds, $row['id']);
                       echo "Row with id: " .$row['id'] . " selected \n ";
                    }
                  echo (var_dump($listOfSelectedIds));  
      }
   }
}

echo ("DONE WITH YEAR AND PLATFORM SELECTION");



//What IF NOTHING IS FOUUND FOR THE YEARS AND PLATFORM... THEN THE IDS ARE EMPTY AND GENRE STILL INITIATES. 
// $listOfSelectedIds = []; 
// $finalListSelectedIds = [];
// if(!empty($plat_and_year_query)){    
//   $length = count($plat_and_year_query);
//   for($i  = 0  ; $i<$length;$i++){
//     // echo "CALLING THE CONNECTION \n";
//       $result = $conn->query($plat_and_year_query[$i]);
//       if($result->num_rows > 0 ){
//               //Out put the data, put each of the ids in a array.
//               while($row = $result->fetch_assoc()){
//               // echo "id: " . $row["release_id"]. " - Plat Name: " . $row["platform_name"]. "  Date" . $row["release_date"]. "<br> \n";
//               //Don't put in if repeated
//                   if(!in_array($row["release_id"], $listOfSelectedIds)){
//                       array_push($listOfSelectedIds, $row['release_id']);
//                       $platform_year_found = 'true' ;                  
//                     }
//               } 
//          }else{
//             // echo "No results, sorry \n";
//            $platform_year_found = 'false';                  

//              }
//        }  
//  }

    //Then create query to just search for genres. There were no platforms etc....
 //HOW ABOUT ONES WITH NO YEAR/RELEASE;


 $genreQueryStatement = [] ; 
 $finalListSelectedIds=[];
  //If the platform and year returned nothing, and there 
//for the boolean if true there are platforms and years, then you need to do the else if, if false... then it shouldn't run.
 //It should only run if there was only thing choosen. 
 // platform_year_found  is basically checking if the user choose any platforms or years. 

//echo "YO PLATFROM_YEAR_FOUND IS......  " .  $platform_year_found . "\n\n\n";
//&&empty($platform_year_found)
if(empty($listOfSelectedIds) && !empty($genres)){
    $genreLength = count($genres);
    for($i=0;$i<$genreLength; $i++){
          $genreQueryStatement[$i] .= "SELECT genre_id,genre_name FROM genres WHERE " . "genre_name= " . "'" . $genres[$i]  ."'";
          echo  $genreQueryStatement[$i] . "\n";
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
          echo "Genre with other data loop i= ".$i . "\n";
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
          } // end j loop
         $result = $conn->query($genreQueryStatement[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                           echo "Results Found for genre with the mathcing id! \n";
                           echo "id: " . $row["genre_id"]. " - Genre Name: " . $row["genre_name"]. "<br>" ."\n";
                            if(!in_array($row["genre_id"], $finalListSelectedIds)){
                               echo "Pushing inside the array \n";
                                array_push($finalListSelectedIds, $row['genre_id']);
                          }
               }
             echo "Left the while loop \n"; 
          }
    } //end four loop
    echo "For loop ended man... \n";
    echo (var_dump($finalListSelectedIds));
 }


 echo ("DONE WITH GENRE SELECTION \n");


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
        $timeSelectQuery[$i] .= "SELECT * FROM time_to_beat_table WHERE";
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
          $firstValInt = (int)$firstValue;
          $secondValInt = (int)$secondValue;
          echo "first val is ". $firstValue . " second val is " . $secondValue . "\n";
          for($j=$firstValInt;$j<$secondValInt;$j++){
              if($j==$secondValInt){
                 $timeSelectQuery[$i] .= "(main_story LIKE " . '"%'. $j .  '%"'. ")";
              }else{
                //not end
                 $timeSelectQuery[$i] .= "main_story LIKE " . '"%'. $j .  '%"'. ") OR";
              }
              echo $timeSelectQuery[$i] . "\n\n";
            }

            $result = $conn->query($timeSelectQuery[$i]);
             if($result->num_rows > 0 ){
                while($row = $result->fetch_assoc()){
                           echo "Results Found for time \n";
                            echo "id: " . $row["id"]. " - main story:  " . $row["main_story"]. "<br>" ."\n";
                            if(!in_array($row["id"], $listOfSelectedIds)){
                                array_push($listOfSelectedIds, $row['id']);
                          }
               } 
          }
    }
}else if(!empty($times) && !empty($listOfSelectedIds)){
    //There is a year or platform or genre choose and need to search that with the time.
  //For max time, just say the maximum time is 1000hrs or 800hrs
      $timeLength = count($times);
      $length = count($listOfSelectedIds);
      for($i= 0 ; $i<$length ; $i++){
            $timeSelectQuery[$i] .= "SELECT * FROM time_to_beat_table WHERE ";
            for($j = 0 ; $j<$timeLength;$j++){
               if($times[$j]!=""){
                  $spaceIndex = strpos($times[$j], " "); 
                  $lastIndex =  strlen($times[$j]); 
                  $secondValue =  substr($times[$j], $spaceIndex);
                  $firstValue =  substr($times[$j],0,$spaceIndex);
             }else{
               echo "In the empty time setting with genre/platform/year found \n";
              $firstValue = 0;
              $secondValue= 0;
             }
               echo "First value: " . $firstValue . " Second value " . $secondValue . "\n\n";
               $firstValInt = (int)$firstValue;
               $secondValInt = (int)$secondValue;
                for($k=$firstValInt;$k<$secondValInt;$k++){
                  if($k==$secondValInt){
                      $timeSelectQuery[$i] .= "(main_story LIKE " . '"%'. $k .  '%"'. "AND id=".$listOfSelectedIds[$i] .")";
                  }else{
                //not end
                      $timeSelectQuery[$i] .= "main_story LIKE " . '"%'. $k .  '%"'. "AND id=".$listOfSelectedIds[$i].") OR";
              }
              echo $timeSelectQuery[$i] . "\n\n";
            }
                //    if($j == $timeLength-1){
                //     $timeSelectQuery[$i].= ";";
                // }else{
                //   $timeSelectQuery[$i].= " OR ( ";
                // }
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
             echo "Sorry no results found for this query! \n";
             }
        } //End of j    
            echo $timeSelectQuery[$i] . "\n";        
     }  //end of main loop      
          if(!empty($secondaryArray)){
           //copy it to listIDS overwrite it, else just use the values in it.
           $listOfSelectedIds = $secondaryArray;
          }
}

 echo ("DONE WITH time SELECTION \n");


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
            $scoresSelectQuery[$i] .= "SELECT id,rating FROM giant_bomb_games WHERE( ";
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


 echo ("DONE WITH scores SELECTION \n");

//FINALLY listOfSelectedIds should have all the games needed;
echo(var_dump($listOfSelectedIds));
//They don't want to have any criteria, and it selects from all games.

if(empty($platforms) && empty($genres) && empty($scores) && empty($times) && empty($ratings) && empty($years)){
//Pick a random row from the entire table
   echo " No preferences choosen, selecting game at random. \n";
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
   echo "SORRY NO RESULTS FOUND FOR THESE CRITERIA, TRY AGAIN!!! \n\n" ;
}else{
  echo "THERE WAS SOMETHING CHOSEN, CALCULATING RANDOM ID \n";
  //There was something selected found
  $length  = count($listOfSelectedIds);
  for($i = 0 ; $i<$length; $i++){
     echo "Final selected ID is: " . $listOfSelectedIds[$i] . "  index: " . $i . "\n\n" ;
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
$result3 = $conn->query($randomPlatform);
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
                      //$data = $row["platform_name"];
                      array_push($platformArray, $row["platform_name"]);
                }
                   echo "\n" .  var_dump($platformArray); 
                  $contentArray["platforms"]=$platformArray;
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
      }

      // echo "\n" .  var_dump($releaseInfoArray); 
        // $contentArray["platforms"]=$releaseInfoArray;
           echo "Echoing final contents of the ContentArray!" . "\n" ;
          echo var_dump($contentArray);

 }

   $conn->close();
?>
