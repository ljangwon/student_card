<?php
include "../../lib/conn.php";

$st_id = $_POST[ 'st_id' ];

if( !$st_id ) {
  print_r( "error");
  exit;
}

$course = "미정";
$memo = "미정";


$sql = "INSERT INTO study_history ( `st_id`, `course`, `memo` ) VALUES ( '".$st_id."', '".$course."', '".$memo."') ";
  
$result = db_insert($sql);

  if( $result == 'ok' ) {
    echo $result;
  }
  else {
    echo $result;
  }

db_close();
?>