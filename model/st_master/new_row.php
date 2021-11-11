<?php
include "../../lib/conn.php";

$grade1 = "미정";
$grade2 = "미정";
$name = $_POST[ 'name' ];
$status = "대기";

  $sql = "INSERT INTO st_master (`grade1`, `grade2`, `name`, `status`) VALUES ( '".$grade1."', '".$grade2."', '".$name."', '".$status."') ";
  
  $result = db_insert($sql);
 
  if( $result == 'ok' ) {
    echo 'st_master table data is inserted';
  }
  else {
    echo $result;
  }

db_close();
