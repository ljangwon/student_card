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
  case "Grade1" : $dbColumn = "grade1";
    break;
  case "Grade2" : $dbColumn = "grade2";
    break;
  case "Name" : $dbColumn = "name";
    break;
  case "Status" : $dbColumn = "status";
    break;
  case "House" : $dbColumn = "house";
    break;
    $dbColumn = "none";
}

$result = null;

if($dbColumn && $id && $value)
{
  $sql = "update st_master set " . $dbColumn . "='" .$value."' where id='". $id ."' ";

  $result = db_update($sql);
 
  if( $result == 'ok' ) {
    echo 'st_master table is updated';
  }
  else {
    echo $result;
  }
}

db_close();

?>