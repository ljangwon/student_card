<?php
include "../../lib/conn.php";

$id = $_POST[ 'id' ];
$header = $_POST[ 'header' ];
$value = $_POST[ 'value' ];

if(!$header) {
  exit;
}

$dbColumn = "";
switch($header) {
  case "id" : $dbColumn = "id";
    break;
  case "st_id" : $dbColumn = "st_id";
    break;
  case "course" : $dbColumn = "course";
    break;
  case "memo" : $dbColumn = "memo";
    break;
    $dbColumn = "none";
}

$result = null;

if($dbColumn && $id && $value)
{
  $sql = "update study_history set " . $dbColumn . "='" .$value."' where id='". $id ."' ";

  $result = db_update($sql);
 
  if( $result == 'ok' ) {
    echo 'study_history table is updated';
  }
  else {
    echo $result;
  }
}

db_close();

?>